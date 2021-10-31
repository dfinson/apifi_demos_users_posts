package dev.sanda.users_and_posts.service;

import static dev.sanda.users_and_posts.service.Helpers.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import dev.sanda.apifi.test_utils.TestGraphQLService;
import dev.sanda.datafi.dto.FreeTextSearchPageRequest;
import dev.sanda.datafi.dto.Page;
import dev.sanda.datafi.dto.PageRequest;
import dev.sanda.datafi.service.DataManager;
import dev.sanda.users_and_posts.model.*;
import java.util.*;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@Transactional
@SpringBootTest
@RunWith(SpringRunner.class)
@AllArgsConstructor(onConstructor_ = @Autowired)
class PostGraphQLApiServiceTest {

  private final TestGraphQLService<Post> testApi;
  private final DataManager<Post> postDataManager;
  private final DataManager<User> userDataManager;
  private final Helpers helpers;

  @Test
  void user() {
    List<Post> posts = new ArrayList<>();
    List<User> users = new ArrayList<>();
    for (int i = 0; i < DEFAULT_NUM_USERS; i++) {
      User user = helpers.generateMockUser(true);
      Post post = helpers.generatePost(user, true);
      users.add(user);
      posts.add(post);
    }
    List<User> postAuthors = testApi.invokeEndpoint("user", posts);
    assertEquals(users, postAuthors);
  }

  @Test
  void comments() {
    User user = helpers.generateMockUser(true);
    List<Post> posts = new ArrayList<>(
      helpers.generatePosts(user, DEFAULT_NUM_POSTS, true)
    );
    List<List<Comment>> commentsOfPosts = new ArrayList<>();
    for (Post post : posts) {
      List<Comment> comments = new ArrayList<>();
      for (int i = 0; i < DEFAULT_NUM_COMMENTS; i++) comments.add(
        helpers.generateMockComment(user, post, true)
      );
      commentsOfPosts.add(comments);
    }

    List<List<Comment>> fetchedCommentsOfPosts = testApi.invokeEndpoint(
      "comments",
      posts
    );
    assertEquals(commentsOfPosts, fetchedCommentsOfPosts);
  }

  @Test
  void addReactionsToPost() {
    User user = helpers.generateMockUser(true);
    Post post = helpers.generatePost(user, true);
    List<Reaction> reactions = helpers.generateReactions();
    List<Reaction> addedReactions = testApi.invokeEndpoint(
      "addReactionsToPost",
      post,
      reactions
    );
    assertEquals(reactions, addedReactions);
    assertEquals(addedReactions, post.getReactions());
  }

  @Test
  void removeReactionsFromPost() {
    User user = helpers.generateMockUser(true);
    Post post = helpers.generatePost(user, true);
    List<Reaction> reactions = helpers.generateReactions(post);
    List<Reaction> removedReactions = testApi.invokeEndpoint(
      "removeReactionsFromPost",
      post,
      reactions
    );
    assertEquals(reactions, removedReactions);
    assertTrue(post.getReactions().isEmpty());
  }

  @Test
  void reactionsOfPost() {
    User user = helpers.generateMockUser(true);
    Post post = helpers.generatePost(user, true);
    final int numReactions = 3 * DEFAULT_NUM_REACTIONS;
    List<Reaction> reactions = helpers.generateReactions(post, numReactions);
    PageRequest request = new PageRequest();
    request.setPageSize(DEFAULT_NUM_REACTIONS);
    request.setPageNumber(0);
    Page<Reaction> response = testApi.invokeEndpoint(
      "reactionsOfPost",
      post,
      request
    );
    assertEquals(0, response.getPageNumber());
    assertEquals(numReactions, response.getTotalItemsCount());
    assertEquals(3, response.getTotalPagesCount());
    assertEquals(DEFAULT_NUM_REACTIONS, response.getContent().size());
  }

  @Test
  void freeTextSearchReactionsOfPost() {
    User user = helpers.generateMockUser(true);
    Post post = helpers.generatePost(user, true);
    final int numReactions = 3 * DEFAULT_NUM_REACTIONS;
    List<Reaction> reactions = helpers.generateReactions(post, numReactions);
    FreeTextSearchPageRequest request = new FreeTextSearchPageRequest();
    request.setSearchTerm(
      helpers.getLongestCommonSubstring(
        reactions.stream().map(Reaction::toString).collect(Collectors.toSet())
      )
    );
    request.setPageSize(DEFAULT_NUM_REACTIONS);
    request.setPageNumber(0);
    Page<Reaction> response = testApi.invokeEndpoint(
      "freeTextSearchReactionsOfPost",
      post,
      request
    );
    assertEquals(0, response.getPageNumber());
    assertEquals(numReactions, response.getTotalItemsCount());
    assertEquals(3, response.getTotalPagesCount());
    assertEquals(DEFAULT_NUM_REACTIONS, response.getContent().size());
  }

  @Test
  void addTagCountToPost() {
    User user = helpers.generateMockUser(true);
    Post post = helpers.generatePost(user, true);
    Map<Tag, Integer> tagMap = new HashMap<>();
    Arrays
      .stream(Tag.values())
      .forEach(tag -> tagMap.put(tag, DEFAULT_NUM_TAGS));
    Map<Tag, Integer> addedTagCounts = testApi.invokeEndpoint(
      "addTagCountToPost",
      post,
      tagMap
    );
    assertEquals(tagMap, addedTagCounts);
  }

  @Test
  void removeTagCountFromPost() {
    User user = helpers.generateMockUser(true);
    Post post = helpers.generatePost(user, true);
    Map<Tag, Integer> tagMap = new HashMap<>();
    Arrays
      .stream(Tag.values())
      .forEach(tag -> tagMap.put(tag, DEFAULT_NUM_TAGS));
    Map<Tag, Integer> addedTagCounts = testApi.invokeEndpoint(
      "addTagCountToPost",
      post,
      tagMap
    );
    assertEquals(tagMap, addedTagCounts);
    List<Tag> toRemove = Collections.singletonList(Tag.INSPIRATIONAL_);
    Map<Tag, Integer> removed = testApi.invokeEndpoint(
      "removeTagCountFromPost",
      post,
      toRemove
    );
    Map<Tag, Integer> expected = new HashMap<Tag, Integer>() {
      {
        put(Tag.INSPIRATIONAL_, DEFAULT_NUM_TAGS);
      }
    };
    assertEquals(expected, removed);
    assertEquals(3, post.getTagCount().size());
  }

  @Test
  void tagCountOfPost() {
    User user = helpers.generateMockUser(true);
    Post post = helpers.generatePost(user, true);
    Map<Tag, Integer> tagMap = new HashMap<>();
    Arrays
      .stream(Tag.values())
      .forEach(tag -> tagMap.put(tag, DEFAULT_NUM_TAGS));
    Map<Tag, Integer> addedTagCounts = testApi.invokeEndpoint(
      "addTagCountToPost",
      post,
      tagMap
    );
    assertEquals(tagMap, addedTagCounts);

    PageRequest request = new PageRequest();
    request.setPageNumber(0);
    request.setPageSize(50);

    Page<Map.Entry<Tag, Integer>> response = testApi.invokeEndpoint(
      "tagCountOfPost",
      post,
      request
    );

    assertEquals(tagMap.entrySet(), new HashSet<>(response.getContent()));
    assertEquals(1, response.getTotalPagesCount());
    assertEquals(4, response.getTotalItemsCount());
    assertEquals(0, response.getPageNumber());
  }

  @Test
  void freeTextSearchTagCountOfPost() {
    User user = helpers.generateMockUser(true);
    Post post = helpers.generatePost(user, true);
    Map<Tag, Integer> tagMap = new HashMap<>();
    Arrays
      .stream(Tag.values())
      .forEach(tag -> tagMap.put(tag, DEFAULT_NUM_TAGS));
    Map<Tag, Integer> addedTagCounts = testApi.invokeEndpoint(
      "addTagCountToPost",
      post,
      tagMap
    );
    assertEquals(tagMap, addedTagCounts);

    FreeTextSearchPageRequest request = new FreeTextSearchPageRequest();
    request.setPageNumber(0);
    request.setPageSize(50);
    request.setSearchTerm("_");

    Page<Map.Entry<Tag, Integer>> response = testApi.invokeEndpoint(
      "freeTextSearchTagCountOfPost",
      post,
      request
    );

    assertEquals(tagMap.entrySet(), new HashSet<>(response.getContent()));
    assertEquals(1, response.getTotalPagesCount());
    assertEquals(4, response.getTotalItemsCount());
    assertEquals(0, response.getPageNumber());
  }
}
