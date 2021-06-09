package dev.sanda.users_and_posts.service;

import com.github.javafaker.Faker;
import com.googlecode.concurrenttrees.radix.node.concrete.DefaultCharSequenceNodeFactory;
import com.googlecode.concurrenttrees.solver.LCSubstringSolver;
import dev.sanda.apifi.service.graphql_subcriptions.testing_utils.TestSubscriber;
import dev.sanda.apifi.test_utils.TestableGraphQLService;
import dev.sanda.datafi.service.DataManager;
import dev.sanda.users_and_posts.model.Comment;
import dev.sanda.users_and_posts.model.Post;
import dev.sanda.users_and_posts.model.Reaction;
import dev.sanda.users_and_posts.model.User;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import javax.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor(onConstructor_ = @Autowired)
public class Helpers {

  //constants
  public static final int DEFAULT_NUM_POSTS = 15;
  public static final int DEFAULT_NUM_USERS = 25;
  public static final int DEFAULT_NUM_COMMENTS = 10;
  public static final int DEFAULT_NUM_REACTIONS = 20;
  public static final int DEFAULT_NUM_TAGS = 15;

  //data access
  private final DataManager<Comment> commentDataManager;
  private final DataManager<User> userDataManager;
  private final DataManager<Post> postDataManager;

  //posts
  public Post generatePost(User author, boolean savePost) {
    Faker faker = new Faker();
    Post post = new Post();
    post.setContent(
      faker.lorem().paragraph(ThreadLocalRandom.current().nextInt(5, 10))
    );
    if (author != null) {
      if (author.getPosts() == null) author.setPosts(new HashSet<>());
      author.getPosts().add(post);
      post.setUser(author);
    }
    if (savePost) post = postDataManager.save(post);
    return post;
  }

  public Post generatePost(boolean savePost) {
    return generatePost(null, savePost);
  }

  public Set<Post> generatePosts(User author, int numPosts, boolean savePosts) {
    Set<Post> posts = new HashSet<>();
    if (author != null && author.getPosts() == null) author.setPosts(
      new HashSet<>()
    );
    for (int i = 0; i < numPosts; i++) {
      if (author != null) posts.add(
        generatePost(author, false)
      ); else posts.add(generatePost(false));
    }
    if (savePosts) posts = new HashSet<>(postDataManager.saveAll(posts));
    return posts;
  }

  public Set<Post> generatePosts(int numPosts, boolean savePosts) {
    return generatePosts(null, numPosts, savePosts);
  }

  public List<User> generateMockUsers(int numUsers, boolean saveUsers) {
    List<User> users = new ArrayList<>();
    for (int i = 0; i < numUsers; i++) users.add(generateMockUser());
    if (saveUsers) users = userDataManager.saveAll(users);
    return users;
  }

  //users
  public User generateMockUser() {
    return generateMockUser(false);
  }

  public User generateMockUser(boolean saveUser) {
    Faker faker = new Faker();
    User user = new User();
    user.setName(faker.name().fullName());
    user.setPhoneNumber(faker.phoneNumber().cellPhone());
    user.setUsername(faker.name().username());
    if (saveUser) user = userDataManager.save(user);
    return user;
  }

  //comments
  public Comment generateMockComment(User author, Post post) {
    return generateMockComment(author, post, false);
  }

  public Comment generateMockComment(
    User author,
    Post post,
    boolean saveComment
  ) {
    return generateMockComment(author, post, null, saveComment);
  }

  public Comment generateMockComment(
    User author,
    Post post,
    Comment inReplyTo,
    boolean saveComment
  ) {
    Comment comment = new Comment();
    comment.setUser(author);
    comment.setPost(post);
    if (post.getComments() == null) post.setComments(new HashSet<>());
    post.getComments().add(comment);
    comment.setInReplyTo(inReplyTo);
    if (inReplyTo != null) {
      if (inReplyTo.getReplies() == null) inReplyTo.setReplies(new HashSet<>());
      inReplyTo.getReplies().add(comment);
    }
    comment.setContent(
      new Faker().lorem().paragraph(ThreadLocalRandom.current().nextInt(5, 10))
    );
    if (saveComment) comment = commentDataManager.save(comment);
    return comment;
  }

  //reactions
  public List<Reaction> generateReactions() {
    return generateReactions(null, DEFAULT_NUM_REACTIONS);
  }

  public List<Reaction> generateReactions(Post post) {
    return generateReactions(post, DEFAULT_NUM_REACTIONS);
  }

  public List<Reaction> generateReactions(Post post, int numReactions) {
    return IntStream
      .range(0, numReactions)
      .mapToObj(i -> generateReaction(post))
      .collect(Collectors.toList());
  }

  private Reaction generateReaction(Post post) {
    Reaction reaction = Reaction.randomReaction();
    if (post != null) {
      if (post.getReactions() == null) post.setReactions(new ArrayList<>());
      post.getReactions().add(reaction);
    }
    return reaction;
  }

  // misc
  public String getLongestCommonSubstring(Collection<String> strings) {
    LCSubstringSolver solver = new LCSubstringSolver(
      new DefaultCharSequenceNodeFactory()
    );
    strings.forEach(solver::add);
    return solver.getLongestCommonSubstring().toString();
  }

  // transaction
  public <T, R> R invokeMethodInTransaction(
    TestableGraphQLService<T> testApi,
    String methodName,
    Object... args
  ) {
    return testApi.invokeEndpoint(methodName, args);
  }

  @SuppressWarnings("rawtypes")
  public TestSubscriber invokeSubscriptionMethodInTransaction(
    TestableGraphQLService testApi,
    String methodName,
    Class targetType,
    Object... args
  ) {
    return testApi.invokeSubscriptionEndpoint(methodName, targetType, args);
  }

  @Transactional
  public void runInTransaction(Runnable runnable) {
    runnable.run();
  }
}
