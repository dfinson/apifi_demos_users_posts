package dev.sanda.users_and_posts.graphql;

import dev.sanda.apifi.service.graphql_config.GraphQLInstanceFactory;
import dev.sanda.users_and_posts.custom_services.CustomUserSubscriptionsService;
import dev.sanda.users_and_posts.service.CommentGraphQLApiService;
import dev.sanda.users_and_posts.service.PostGraphQLApiService;
import dev.sanda.users_and_posts.service.UserGraphQLApiService;
import graphql.GraphQL;
import graphql.analysis.MaxQueryDepthInstrumentation;
import graphql.execution.batched.BatchedExecutionStrategy;
import io.leangen.graphql.GraphQLSchemaGenerator;
import java.lang.Boolean;
import java.lang.Integer;
import java.lang.SuppressWarnings;
import javax.annotation.PostConstruct;
import lombok.Getter;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class GraphQLServiceImplementation implements GraphQLInstanceFactory {

  @Autowired
  private CommentGraphQLApiService commentGraphQLApiService;

  @Autowired
  private PostGraphQLApiService postGraphQLApiService;

  @Autowired
  private UserGraphQLApiService userGraphQLApiService;

  @Autowired
  private CustomUserSubscriptionsService customUserSubscriptionsService;

  private GraphQL.Builder graphQLInstanceBuilder;

  @Value("#{new Integer('${apifi.max-query-depth:15}')}")
  private Integer maxQueryDepth;

  @Getter
  private Boolean hasSubscriptions;

  @PostConstruct
  @SuppressWarnings("deprecation")
  private void init() {
    val schema = new GraphQLSchemaGenerator()
      .withOperationsFromSingleton(
        commentGraphQLApiService,
        CommentGraphQLApiService.class
      )
      .withOperationsFromSingleton(
        postGraphQLApiService,
        PostGraphQLApiService.class
      )
      .withOperationsFromSingleton(
        userGraphQLApiService,
        UserGraphQLApiService.class
      )
      .withOperationsFromSingleton(
        customUserSubscriptionsService,
        CustomUserSubscriptionsService.class
      )
      .generate();
    graphQLInstanceBuilder =
      GraphQL
        .newGraphQL(schema)
        .queryExecutionStrategy(new BatchedExecutionStrategy())
        .instrumentation(new MaxQueryDepthInstrumentation(maxQueryDepth));
    hasSubscriptions = schema.getSubscriptionType() != null;
  }

  public GraphQL getGraphQLInstance() {
    return graphQLInstanceBuilder.build();
  }
}
