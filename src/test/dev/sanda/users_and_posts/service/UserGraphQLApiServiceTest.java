package dev.sanda.users_and_posts.service;

import com.github.javafaker.Faker;
import dev.sanda.apifi.service.graphql_subcriptions.testing_utils.test_subscriber_methods.TestSubscriberWhenMethod;
import dev.sanda.apifi.test_utils.TestGraphQLService;
import dev.sanda.datafi.dto.FreeTextSearchPageRequest;
import dev.sanda.datafi.dto.Page;
import dev.sanda.datafi.dto.PageRequest;
import dev.sanda.datafi.persistence.IdFactory;
import dev.sanda.datafi.service.DataManager;
import dev.sanda.users_and_posts.model.Post;
import dev.sanda.users_and_posts.model.User;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import lombok.val;
import org.jetbrains.annotations.NotNull;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Propagation;
import reactor.core.publisher.FluxSink;

import javax.transaction.Transactional;
import java.util.*;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

import static dev.sanda.users_and_posts.service.Helpers.DEFAULT_NUM_USERS;
import static java.lang.Math.floor;
import static org.junit.jupiter.api.Assertions.*;

@Transactional
@SpringBootTest
@RunWith(SpringRunner.class)
@AllArgsConstructor(onConstructor_ = @Autowired)
class UserGraphQLApiServiceTest {

  private final TestGraphQLService<User> testApi;
  private final DataManager<User> userDataManager;
  private final Helpers helpers;

  @Test
  void users() {
    List<User> users = new ArrayList<>();
    for (int i = 0; i < 100; i++) {
      User user = helpers.generateMockUser();
      user.setName(Integer.toString(i));
      users.add(user);
    }
    users = userDataManager.saveAll(users);
    PageRequest request = new PageRequest();
    for (int i = 0; i < 4; i++) {
      request.setPageNumber(i);
      request.setPageSize(25);
      Page<User> response = testApi.invokeEndpoint("users", request);
      assertEquals(25, response.getContent().size());
      assertEquals(i, response.getPageNumber());
      assertEquals(100, response.getTotalItemsCount());
      assertEquals(4, response.getTotalPagesCount());
      for (int j = i * 25, k = 0; j < (i * 25) + 25; j++, k++) {
        User expected = users.get(j);
        User actual = response.getContent().get(k);
        assertEquals(expected, actual);
      }
    }
  }

  @Test
  void countTotalUsers() {
    final int numUsers = 33;
    final int toArchive = (int) floor((double) numUsers / 2);
    List<User> users = helpers.generateMockUsers(numUsers, true);
    long usersCount = testApi.invokeEndpoint("countTotalUsers");
    assertEquals(numUsers, usersCount);
    for (int i = 0; i < toArchive; i++) users.get(i).setIsArchived(true);
    long nonArchivedUsersCount = testApi.invokeEndpoint("countTotalUsers");
    assertEquals(numUsers - toArchive, nonArchivedUsersCount);
  }

  @Test
  @SneakyThrows
  void countTotalArchivedUsers() {
    List<User> users = helpers.generateMockUsers(DEFAULT_NUM_USERS, true);
    long usersCount = testApi.invokeEndpoint("countTotalUsers");
    assertEquals(DEFAULT_NUM_USERS, usersCount);
    int toArchive = 10;
    for (int i = 0; i < toArchive; i++) users.get(i).setIsArchived(true);
    long archivedUsersCount = testApi.invokeEndpoint("countTotalArchivedUsers");
    assertEquals(toArchive, archivedUsersCount);
  }

  @Test
  void getUserById() {
    // case 1 - user is found
    User user = helpers.generateMockUser(true);
    Long id = user.getId();
    User fetchedUser = testApi.invokeEndpoint("getUserById", id);
    assertEquals(user, fetchedUser);

    //case 2 - user isn't found
    Long badId = IdFactory.getNextId();
    assertThrows(
      RuntimeException.class,
      () -> testApi.invokeEndpoint("getUserById", badId)
    );
  }

  @Test
  void getUsersById() {
    final int numUsers = 50;
    final String methodName = "getUsersByIds";

    // case 1 - all ids are valid
    List<User> users = helpers.generateMockUsers(numUsers, true);
    List<Long> validIds = users
      .stream()
      .map(User::getId)
      .collect(Collectors.toList());
    List<User> fetchedUsers = testApi.invokeEndpoint(methodName, validIds);
    Map<Long, User> fetchedUsersById = fetchedUsers
      .stream()
      .collect(Collectors.toMap(User::getId, user -> user));
    for (User user : users) assertEquals(
      user,
      fetchedUsersById.get(user.getId())
    );

    // case 2 - all ids are invalid
    List<Long> badIds = new ArrayList<>();
    for (int i = 0; i < numUsers; i++) badIds.add(IdFactory.getNextId());
    assertThrows(
      IllegalArgumentException.class,
      () -> testApi.invokeEndpoint(methodName, badIds)
    );

    // case 3 - some ids are valid and some are not
    List<Long> mixedIds = new ArrayList<>();
    mixedIds.addAll(validIds);
    mixedIds.addAll(badIds);
    assertThrows(
      IllegalArgumentException.class,
      () -> testApi.invokeEndpoint(methodName, mixedIds)
    );
  }

  @Test
  void createUser() {
    final String methodName = "createUser";

    // case 1 - user input is valid
    User userToCreate = helpers.generateMockUser();
    User newlyCreatedUser = testApi.invokeEndpoint(methodName, userToCreate);
    assertEquals(userToCreate, newlyCreatedUser);
    User newlyCreatedUserLoadedFromDataBase = userDataManager
      .findById(newlyCreatedUser.getId())
      .orElse(null);
    assertEquals(userToCreate, newlyCreatedUserLoadedFromDataBase);

    // case 2 - user input is null
    assertThrows(
      InvalidDataAccessApiUsageException.class,
      () -> testApi.invokeEndpoint(methodName, new Object[] { null })
    );
  }

  @Test
  void createUsers() {
    final String methodName = "createUsers";
    final int numUsers = 10;

    //case 1 - all user inputs are valid
    List<User> usersToCreate = new ArrayList<>();
    for (int i = 0; i < numUsers; i++) usersToCreate.add(
      helpers.generateMockUser()
    );
    List<User> newlyCreatedUsers = testApi.invokeEndpoint(
      methodName,
      usersToCreate
    );
    assertEquals(usersToCreate, newlyCreatedUsers);

    //case 2 - all user inputs are null
    List<User> nullUserInputs = new ArrayList<>();
    for (int i = 0; i < numUsers; i++) nullUserInputs.add(null);
    assertThrows(
      InvalidDataAccessApiUsageException.class,
      () -> testApi.invokeEndpoint(methodName, nullUserInputs)
    );

    //case 3 - some user inputs are valid and some are null
    List<User> mixedUserInputs = new ArrayList<>(nullUserInputs);
    for (int i = 0; i < numUsers; i++) mixedUserInputs.add(
      helpers.generateMockUser()
    );
    assertThrows(
      InvalidDataAccessApiUsageException.class,
      () -> testApi.invokeEndpoint(methodName, mixedUserInputs)
    );
  }

  @Test
  void updateUser() {
    final String methodName = "updateUser";

    // case 1 - user input is valid
    Faker faker = new Faker();
    User original = helpers.generateMockUser(true);
    User toUpdate = new User();
    toUpdate.setId(original.getId());
    toUpdate.setName(faker.lordOfTheRings().character());
    toUpdate.setUsername(faker.lordOfTheRings().character());
    toUpdate.setPhoneNumber(faker.phoneNumber().phoneNumber());
    assertNotEquals(original, toUpdate);
    User updatedUser = testApi.invokeEndpoint(methodName, toUpdate);
    assertEquals(toUpdate, updatedUser);

    // case 2 - user input is null
    assertThrows(
      IllegalArgumentException.class,
      () -> testApi.invokeEndpoint(methodName, new Object[] { null })
    );
  }

  @Test
  void updateUsers() {
    List<User> users = helpers.generateMockUsers(10, true);
    for (int i = 0; i < users.size(); i++) {
      String updatedValue = Integer.toString(i);
      users.get(i).setName(updatedValue);
      users.get(i).setPhoneNumber(updatedValue);
      users.get(i).setUsername(updatedValue);
    }
    Map<Long, User> usersById = users
      .stream()
      .collect(Collectors.toMap(User::getId, u -> u));
    List<User> updatedUsers = testApi.invokeEndpoint("updateUsers", users);
    for (User user : updatedUsers) assertEquals(
      usersById.get(user.getId()),
      user
    );
  }

  @Test
  void deleteUser() {
    User user = helpers.generateMockUser(true);
    User deletedUser = testApi.invokeEndpoint("deleteUser", user);
    assertEquals(user, deletedUser);
    assertFalse(userDataManager.existsById(user.getId()));
  }

  @Test
  void deleteUsers() {
    List<User> users = helpers.generateMockUsers(DEFAULT_NUM_USERS, true);
    List<User> deletedUsers = testApi.invokeEndpoint("deleteUsers", users);
    assertEquals(users, deletedUsers);
    assertFalse(
      deletedUsers
        .stream()
        .anyMatch(user -> userDataManager.existsById(user.getId()))
    );
  }

  @Test
  void archiveUser() {
    User user = helpers.generateMockUser(true);
    User archivedUser = testApi.invokeEndpoint("archiveUser", user);
    User fetchedUser = userDataManager
      .findById(archivedUser.getId())
      .orElse(null);
    assertNotNull(fetchedUser);
    assertTrue(fetchedUser.getIsArchived());
  }

  @Test
  void archiveUsers() {
    List<User> users = helpers.generateMockUsers(DEFAULT_NUM_USERS, true);
    List<User> archivedUsers = testApi.invokeEndpoint("archiveUsers", users);
    assertTrue(archivedUsers.stream().allMatch(User::getIsArchived));
    List<User> fetchedArchivedUsers = userDataManager.findAllById(
      users.stream().map(User::getId).collect(Collectors.toList())
    );
    assertEquals(archivedUsers, fetchedArchivedUsers);
  }

  @Test
  void deArchiveUser() {
    User user = helpers.generateMockUser(true);
    user = userDataManager.archive(user);
    User deArchivedUser = testApi.invokeEndpoint("deArchiveUser", user);
    assertFalse(deArchivedUser.getIsArchived());
    User fetchedDeArchivedUser = userDataManager
      .findById(user.getId())
      .orElse(null);
    assertNotNull(fetchedDeArchivedUser);
    assertEquals(deArchivedUser, fetchedDeArchivedUser);
  }

  @Test
  void deArchiveUsers() {
    List<User> users = helpers.generateMockUsers(50, true);
    users = userDataManager.archiveCollection(users);
    assertTrue(users.stream().allMatch(User::getIsArchived));
    List<User> deArchivedUsers = testApi.invokeEndpoint(
      "deArchiveUsers",
      users
    );
    assertFalse(deArchivedUsers.stream().anyMatch(User::getIsArchived));
    List<User> fetchedDeArchivedUsers = userDataManager.findAllById(
      users.stream().map(User::getId).collect(Collectors.toList())
    );
    assertEquals(deArchivedUsers, fetchedDeArchivedUsers);
  }

  @Test
  void archivedUsers() {
    List<User> users = helpers.generateMockUsers(50, true);
    users = userDataManager.archiveCollection(users);
    PageRequest request = new PageRequest();
    request.setSortBy("id");
    request.setPageSize(50);
    request.setPageNumber(0);
    Page<User> response = testApi.invokeEndpoint("archivedUsers", request);
    assertEquals(50, response.getContent().size());
    assertEquals(50, response.getTotalItemsCount());
    assertEquals(0, response.getPageNumber());
    assertEquals(1, response.getTotalPagesCount());
    assertEquals(users, response.getContent());
  }

  @Test
  void posts() {
    List<User> users = helpers.generateMockUsers(5, true);
    for (User user : users) helpers.generatePosts(user, 5, true);
    users = userDataManager.saveAll(users);
    List<List<Post>> postsLists = testApi.invokeEndpoint("posts", users);
    for (int i = 0; i < 5; i++) {
      User user = users.get(i);
      Map<Long, Post> postsById = user
        .getPosts()
        .stream()
        .collect(Collectors.toMap(Post::getId, p -> p));
      for (Post post : postsLists.get(i)) assertEquals(
        postsById.get(post.getId()),
        post
      );
    }
  }

  @Test
  void associatePostsWithUser() {
    Set<Post> posts = helpers.generatePosts(20, true);
    User user = helpers.generateMockUser(true);
    List<Post> postsList = new ArrayList<>(posts);
    List<Post> associatedPosts = testApi.invokeEndpoint(
      "associatePostsWithUser",
      user,
      postsList
    );
    assertEquals(postsList, associatedPosts);
    user = userDataManager.findById(user.getId()).orElse(null);
    assertNotNull(user);
    Map<Long, Post> postsOfUserById = user
      .getPosts()
      .stream()
      .collect(Collectors.toMap(Post::getId, p -> p));
    for (Post post : associatedPosts) assertEquals(
      postsOfUserById.get(post.getId()),
      post
    );
  }

  @Test
  void removePostsFromUser() {
    User user = helpers.generateMockUser(true);
    Set<Post> posts = helpers.generatePosts(user, 10, true);
    testApi.invokeEndpoint(
      "removePostsFromUser",
      user,
      new ArrayList<>(posts).subList(0, 5)
    );
    user = userDataManager.findById(user.getId()).get();
    assertEquals(5, user.getPosts().size());
  }

  @Test
  void postsOfUser() {
    User user = helpers.generateMockUser(true);
    Set<Post> posts = helpers.generatePosts(user, 50, true);
    PageRequest request = new PageRequest();
    request.setPageNumber(0);
    request.setPageSize(user.getPosts().size());
    Page<Post> response = testApi.invokeEndpoint("postsOfUser", user, request);
    assertEquals(50, response.getContent().size());
    assertEquals(50, response.getTotalItemsCount());
    assertEquals(1, response.getTotalPagesCount());
    assertEquals(0, response.getPageNumber());
    Map<Long, Post> postsOfUserById = user
      .getPosts()
      .stream()
      .collect(Collectors.toMap(Post::getId, p -> p));
    for (Post post : response.getContent()) assertEquals(
      postsOfUserById.get(post.getId()),
      post
    );
  }

  @Test
  void postsOfUserFreeTextSearch() {
    User user = helpers.generateMockUser(true);
    Set<Post> posts = helpers.generatePosts(user, 20, true);
    user = userDataManager.save(user);
    String searchTerm = helpers.getLongestCommonSubstring(
      posts.stream().map(Post::getContent).collect(Collectors.toSet())
    );
    FreeTextSearchPageRequest request = new FreeTextSearchPageRequest();
    request.setPageNumber(0);
    request.setPageSize(20);
    request.setSearchTerm(searchTerm);
    Page<Post> response = testApi.invokeEndpoint(
      "postsOfUserFreeTextSearch",
      user,
      request
    );
    assertEquals(0, response.getPageNumber());
    assertEquals(20, response.getTotalItemsCount());
    assertEquals(20, response.getContent().size());
  }

  @Test
  @org.springframework.transaction.annotation.Transactional(
    propagation = Propagation.NEVER
  )
  void onUsersCreated() {
    AtomicReference<List<User>> usersRef = new AtomicReference<>();
    testApi
      .invokeSubscriptionEndpoint(
        "onUsersCreated",
        User.class,
        FluxSink.OverflowStrategy.BUFFER
      )
      .when(() -> usersRef.set(helpers.generateMockUsers(2, false)))
      .expect(usersRef.get());
  }

  @Test
  @org.springframework.transaction.annotation.Transactional(
    propagation = Propagation.NEVER
  )
  void onUserUpdated() {
    List<User> users = helpers.generateMockUsers(DEFAULT_NUM_USERS, true);
    User toUpdate = users.stream().findAny().orElseThrow(RuntimeException::new);
    val subscriber = generateTestSubscriber("onUserUpdated", User.class, users);
    String originalName = toUpdate.getName();
    String reversedName = new StringBuilder(originalName).reverse().toString();
    toUpdate.setName(reversedName);
    AtomicReference<User> updatedUserRef = new AtomicReference<>();
    subscriber
      .when(
        () -> updatedUserRef.set(testApi.invokeEndpoint("updateUser", toUpdate))
      )
      .expect(updatedUserRef.get());
  }

  @Test
  @org.springframework.transaction.annotation.Transactional(
    propagation = Propagation.NEVER
  )
  @SneakyThrows
  void onUserDeleted() {
    List<User> users = helpers.generateMockUsers(DEFAULT_NUM_USERS, true);
    val subscriber = generateTestSubscriber("onUserDeleted", User.class, users);
    AtomicReference<User> userToDeleteRef = new AtomicReference<>();
    subscriber
      .when(
        () ->
          userToDeleteRef.set(
            testApi.invokeEndpoint(
              "deleteUser",
              users.stream().findAny().orElseThrow(RuntimeException::new)
            )
          )
      )
      .expect(userToDeleteRef.get());
  }

  @Test
  @org.springframework.transaction.annotation.Transactional(
    propagation = Propagation.NEVER
  )
  @SneakyThrows
  void onUserArchived() {
    List<User> users = helpers.generateMockUsers(DEFAULT_NUM_USERS, true);
    val subscriber = generateTestSubscriber(
      "onUserArchived",
      User.class,
      users
    );
    AtomicReference<User> userToArchiveRef = new AtomicReference<>();
    subscriber
      .when(
        () ->
          userToArchiveRef.set(
            testApi.invokeEndpoint(
              "archiveUser",
              users.stream().findAny().orElseThrow(RuntimeException::new)
            )
          )
      )
      .expect(userToArchiveRef.get());
  }

  @Test
  @org.springframework.transaction.annotation.Transactional(
    propagation = Propagation.NEVER
  )
  @SneakyThrows
  void onUserDeArchived() {
    List<User> users = helpers.generateMockUsers(DEFAULT_NUM_USERS, true);
    val subscriber = generateTestSubscriber(
      "onUserDeArchived",
      User.class,
      users
    );
    User subject = users.stream().findAny().orElseThrow(RuntimeException::new);
    subject.setIsArchived(true);
    userDataManager.flush();
    AtomicReference<User> subjectUserRef = new AtomicReference<>();
    subscriber
      .when(
        () ->
          subjectUserRef.set(testApi.invokeEndpoint("deArchiveUser", subject))
      )
      .expect(subjectUserRef.get());
  }

  @Test
  @org.springframework.transaction.annotation.Transactional(
    propagation = Propagation.NEVER
  )
  @SneakyThrows
  void onAssociatePostsWithUser() {
    User user = helpers.generateMockUser(true);
    val subscriber = generateTestSubscriber(
      "onAssociatePostsWithUser",
      Post.class,
      user
    );
    AtomicReference<List<Post>> toAssociateRef = new AtomicReference<>();
    subscriber
      .when(
        () ->
          toAssociateRef.set(
            associatePostsWithUser(
              user,
              Collections.singletonList(
                Optional
                  .of(helpers.generatePost(false))
                  .orElseThrow(RuntimeException::new)
              )
            )
          )
      )
      .expect(toAssociateRef.get());
  }

  @Test
  @org.springframework.transaction.annotation.Transactional(
    propagation = Propagation.NEVER
  )
  void onRemovePostsFromUser() {
    AtomicReference<User> userReference = new AtomicReference<>(
      helpers.generateMockUser(true)
    );
    val subscriber = generateTestSubscriber(
      "onRemovePostsFromUser",
      Post.class,
      userReference.get()
    );
    AtomicReference<List<Post>> removedPostsReference = new AtomicReference<>();
    subscriber
      .when(
        () ->
          helpers.runInTransaction(
            () -> {
              userReference.set(
                userDataManager
                  .findById(userReference.get().getId())
                  .orElseThrow(RuntimeException::new)
              );
              final List<Post> postsOfUser = testApi.invokeEndpoint(
                "associatePostsWithUser",
                userReference.get(),
                new ArrayList<>(helpers.generatePosts(10, false))
              );
              final Post toRemove = postsOfUser
                .stream()
                .findAny()
                .orElseThrow(RuntimeException::new);
              final List<Post> removedPosts = testApi.invokeEndpoint(
                "removePostsFromUser",
                userReference.get(),
                Collections.singletonList(toRemove)
              );
              removedPostsReference.set(removedPosts);
              try {
                Thread.sleep(2500);
              } catch (InterruptedException ignored) {}
            }
          )
      )
      .expect(removedPostsReference.get());
  }

  @SuppressWarnings("rawtypes")
  private <T> TestSubscriberWhenMethod generateTestSubscriber(
    String methodName,
    Class targetType,
    T primaryInput
  ) {
    return testApi.invokeSubscriptionEndpoint(
      methodName,
      targetType,
      primaryInput,
      FluxSink.OverflowStrategy.BUFFER
    );
  }

  @NotNull
  private List<Post> associatePostsWithUser(User user, List<Post> input) {
    AtomicReference<List<Post>> toAssociate = new AtomicReference<>(input);
    helpers.runInTransaction(
      () -> {
        final User userReloaded = userDataManager
          .findById(user.getId())
          .orElseThrow(RuntimeException::new);
        toAssociate.set(
          testApi.invokeEndpoint(
            "associatePostsWithUser",
            userReloaded,
            toAssociate.get()
          )
        );
      }
    );
    return toAssociate.get();
  }

  @BeforeEach
  void wipeDB() {
    userDataManager.deleteAll();
  }
}
