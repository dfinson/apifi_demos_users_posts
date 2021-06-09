package dev.sanda.users_and_posts.service;

import dev.sanda.apifi.service.api_hooks.ApiHooks;
import dev.sanda.apifi.service.api_logic.ApiLogic;
import dev.sanda.apifi.service.api_logic.SubscriptionsLogicService;
import dev.sanda.datafi.dto.FreeTextSearchPageRequest;
import dev.sanda.datafi.dto.Page;
import dev.sanda.datafi.dto.PageRequest;
import dev.sanda.datafi.service.DataManager;
import dev.sanda.users_and_posts.model.Post;
import dev.sanda.users_and_posts.model.User;
import graphql.execution.batched.Batched;
import io.leangen.graphql.annotations.GraphQLArgument;
import io.leangen.graphql.annotations.GraphQLContext;
import io.leangen.graphql.annotations.GraphQLMutation;
import io.leangen.graphql.annotations.GraphQLQuery;
import io.leangen.graphql.annotations.GraphQLSubscription;
import java.lang.Long;
import java.lang.SuppressWarnings;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.annotation.security.RolesAllowed;
import javax.transaction.Transactional;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxSink;

@Service
@Transactional
public class UserGraphQLApiService {

  @Autowired
  @Getter
  private ApiLogic<User> apiLogic;

  @Autowired
  @Getter
  private DataManager<User> dataManager;

  @Autowired(required = false)
  @Getter
  private ApiHooks<User> apiHooks;

  @Autowired
  private DataManager<Post> postsDataManager;

  @Autowired
  private SubscriptionsLogicService<Post> postsSubscriptionsLogicService;

  @PostConstruct
  private void postConstructInit() {
    apiLogic.init(dataManager, apiHooks);
  }

  @GraphQLQuery
  public Page<User> users(PageRequest input) {
    if (input.getSortBy() == null) {
      input.setSortBy("id");
    }
    return apiLogic.getPaginatedBatch(input);
  }

  @GraphQLQuery
  public long countTotalUsers() {
    return apiLogic.getTotalNonArchivedCount();
  }

  @GraphQLQuery
  public long countTotalArchivedUsers() {
    return apiLogic.getTotalArchivedCount();
  }

  @GraphQLQuery(name = "getUserById")
  public User getUserById(Long input) {
    return apiLogic.getById(input);
  }

  @GraphQLQuery(name = "getUsersByIds")
  public List<User> getUsersByIds(List<Long> input) {
    return apiLogic.getBatchByIds(input);
  }

  @GraphQLMutation
  @RolesAllowed("ROLE_ADMIN")
  @PreAuthorize("#{hasRole('ROLE_SYS_ADMIN')}")
  public User createUser(User input) {
    return apiLogic.create(input);
  }

  @GraphQLMutation
  public List<User> createUsers(List<User> input) {
    return apiLogic.batchCreate(input);
  }

  @GraphQLMutation
  @RolesAllowed("ROLE_ADMIN")
  @PreAuthorize("#{hasRole('ROLE_SYS_ADMIN')}")
  public User updateUser(User input) {
    return apiLogic.update(input);
  }

  @GraphQLMutation
  public List<User> updateUsers(List<User> input) {
    return apiLogic.batchUpdate(input);
  }

  @GraphQLMutation
  public User deleteUser(User input) {
    return apiLogic.delete(input);
  }

  @GraphQLMutation
  public List<User> deleteUsers(List<User> input) {
    return apiLogic.batchDelete(input);
  }

  @GraphQLMutation
  public User archiveUser(User input) {
    return apiLogic.archive(input);
  }

  @GraphQLMutation
  public List<User> archiveUsers(List<User> input) {
    return apiLogic.batchArchive(input);
  }

  @GraphQLMutation
  public User deArchiveUser(User input) {
    return apiLogic.deArchive(input);
  }

  @GraphQLMutation
  public List<User> deArchiveUsers(List<User> input) {
    return apiLogic.batchDeArchive(input);
  }

  @GraphQLQuery
  public Page<User> archivedUsers(PageRequest input) {
    if (input.getSortBy() == null) {
      input.setSortBy("id");
    }
    return apiLogic.getArchivedPaginatedBatch(input);
  }

  @GraphQLSubscription
  @RolesAllowed("ROLE_ADMIN")
  public Flux<List<User>> onUsersCreated(
    @GraphQLArgument(
      name = "backPressureStrategy",
      defaultValue = "\"BUFFER\""
    ) FluxSink.OverflowStrategy backPressureStrategy
  ) {
    return apiLogic.onCreateSubscription(backPressureStrategy);
  }

  @GraphQLSubscription
  @RolesAllowed("ROLE_ADMIN")
  public Flux<User> onUserUpdated(
    List<User> toObserve,
    @GraphQLArgument(
      name = "backPressureStrategy",
      defaultValue = "\"BUFFER\""
    ) FluxSink.OverflowStrategy backPressureStrategy
  ) {
    return apiLogic.onUpdateSubscription(toObserve, backPressureStrategy);
  }

  @GraphQLSubscription
  @RolesAllowed("ROLE_ADMIN")
  @PreAuthorize("#{hasRole('ROLE_SYS_ADMIN')}")
  public Flux<User> onUserDeleted(
    List<User> toObserve,
    @GraphQLArgument(
      name = "backPressureStrategy",
      defaultValue = "\"BUFFER\""
    ) FluxSink.OverflowStrategy backPressureStrategy
  ) {
    return apiLogic.onDeleteSubscription(toObserve, backPressureStrategy);
  }

  @GraphQLSubscription
  @RolesAllowed("ROLE_ADMIN")
  @PreAuthorize("#{hasRole('ROLE_SYS_ADMIN')}")
  public Flux<User> onUserArchived(
    List<User> toObserve,
    @GraphQLArgument(
      name = "backPressureStrategy",
      defaultValue = "\"BUFFER\""
    ) FluxSink.OverflowStrategy backPressureStrategy
  ) {
    return apiLogic.onArchiveSubscription(toObserve, backPressureStrategy);
  }

  @GraphQLSubscription
  @RolesAllowed("ROLE_ADMIN")
  @PreAuthorize("#{hasRole('ROLE_SYS_ADMIN')}")
  public Flux<User> onUserDeArchived(
    List<User> toObserve,
    @GraphQLArgument(
      name = "backPressureStrategy",
      defaultValue = "\"BUFFER\""
    ) FluxSink.OverflowStrategy backPressureStrategy
  ) {
    return apiLogic.onDeArchiveSubscription(toObserve, backPressureStrategy);
  }

  @SuppressWarnings("deprecation")
  @Batched
  @GraphQLQuery
  public List<List<Post>> posts(@GraphQLContext List<User> input) {
    return apiLogic.getEntityCollection(input, "posts", null, postsDataManager);
  }

  @GraphQLMutation
  public List<Post> associatePostsWithUser(User owner, List<Post> input) {
    return apiLogic.associateWithEntityCollection(
      owner,
      "posts",
      input,
      postsDataManager,
      null,
      postsSubscriptionsLogicService
    );
  }

  @GraphQLMutation
  public List<Post> updatePostsOfUser(User owner, List<Post> input) {
    return apiLogic.updateEntityCollection(
      owner,
      postsDataManager,
      input,
      null,
      "posts",
      postsSubscriptionsLogicService
    );
  }

  @GraphQLMutation
  public List<Post> removePostsFromUser(User owner, List<Post> input) {
    return apiLogic.removeFromEntityCollection(
      owner,
      "posts",
      input,
      postsDataManager,
      null
    );
  }

  @GraphQLQuery
  public Page<Post> postsOfUser(User owner, PageRequest input) {
    if (input.getSortBy() == null) {
      input.setSortBy("id");
    }
    return apiLogic.getPaginatedBatchInEntityCollection(
      owner,
      input,
      "posts",
      postsDataManager,
      null
    );
  }

  @GraphQLQuery
  public Page<Post> postsOfUserFreeTextSearch(
    User owner,
    FreeTextSearchPageRequest input
  ) {
    if (input.getSortBy() == null) {
      input.setSortBy("id");
    }
    return apiLogic.paginatedFreeTextSearchInEntityCollection(
      owner,
      input,
      "posts",
      postsDataManager,
      null
    );
  }

  @GraphQLSubscription
  public Flux<List<Post>> onAssociatePostsWithUser(
    User owner,
    @GraphQLArgument(
      name = "backPressureStrategy",
      defaultValue = "\"BUFFER\""
    ) FluxSink.OverflowStrategy backPressureStrategy
  ) {
    return apiLogic.onAssociateWithSubscription(
      owner,
      "posts",
      backPressureStrategy
    );
  }

  @GraphQLSubscription
  public Flux<List<Post>> onUpdatePostsOfUser(
    User owner,
    @GraphQLArgument(
      name = "backPressureStrategy",
      defaultValue = "\"BUFFER\""
    ) FluxSink.OverflowStrategy backPressureStrategy
  ) {
    return apiLogic.onUpdateInSubscription(
      owner,
      "posts",
      backPressureStrategy
    );
  }

  @GraphQLSubscription
  public Flux<List<Post>> onRemovePostsFromUser(
    User owner,
    @GraphQLArgument(
      name = "backPressureStrategy",
      defaultValue = "\"BUFFER\""
    ) FluxSink.OverflowStrategy backPressureStrategy
  ) {
    return apiLogic.onRemoveFromSubscription(
      owner,
      "posts",
      backPressureStrategy
    );
  }
}
