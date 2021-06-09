package dev.sanda.users_and_posts.service;

import dev.sanda.apifi.service.api_hooks.ApiHooks;
import dev.sanda.apifi.service.api_logic.ApiLogic;
import dev.sanda.apifi.service.api_logic.SubscriptionsLogicService;
import dev.sanda.datafi.service.DataManager;
import dev.sanda.users_and_posts.model.Comment;
import dev.sanda.users_and_posts.model.Post;
import dev.sanda.users_and_posts.model.User;
import graphql.execution.batched.Batched;
import io.leangen.graphql.annotations.GraphQLContext;
import io.leangen.graphql.annotations.GraphQLQuery;
import java.lang.SuppressWarnings;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class CommentGraphQLApiService {

  @Autowired
  @Getter
  private ApiLogic<Comment> apiLogic;

  @Autowired
  @Getter
  private DataManager<Comment> dataManager;

  @Autowired(required = false)
  @Getter
  private ApiHooks<Comment> apiHooks;

  @Autowired
  private DataManager<Comment> inReplyToDataManager;

  @Autowired
  private DataManager<Comment> repliesDataManager;

  @Autowired
  private DataManager<User> userDataManager;

  @Autowired
  private DataManager<Post> postDataManager;

  @Autowired
  private SubscriptionsLogicService<Comment> inReplyToSubscriptionsLogicService;

  @Autowired
  private SubscriptionsLogicService<Comment> repliesSubscriptionsLogicService;

  @Autowired
  private SubscriptionsLogicService<User> userSubscriptionsLogicService;

  @Autowired
  private SubscriptionsLogicService<Post> postSubscriptionsLogicService;

  @PostConstruct
  private void postConstructInit() {
    apiLogic.init(dataManager, apiHooks);
  }

  @SuppressWarnings("deprecation")
  @Batched
  @GraphQLQuery
  public List<Comment> inReplyTo(@GraphQLContext List<Comment> input) {
    return apiLogic.getEmbedded(input, "inReplyTo", inReplyToDataManager);
  }

  @SuppressWarnings("deprecation")
  @Batched
  @GraphQLQuery
  public List<List<Comment>> replies(@GraphQLContext List<Comment> input) {
    return apiLogic.getEntityCollection(
      input,
      "replies",
      null,
      repliesDataManager
    );
  }

  @SuppressWarnings("deprecation")
  @Batched
  @GraphQLQuery
  public List<User> user(@GraphQLContext List<Comment> input) {
    return apiLogic.getEmbedded(input, "user", userDataManager);
  }

  @SuppressWarnings("deprecation")
  @Batched
  @GraphQLQuery
  public List<Post> post(@GraphQLContext List<Comment> input) {
    return apiLogic.getEmbedded(input, "post", postDataManager);
  }
}
