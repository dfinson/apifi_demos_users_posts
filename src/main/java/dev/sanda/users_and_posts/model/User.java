package dev.sanda.users_and_posts.model;

import static dev.sanda.apifi.code_generator.entity.CRUDEndpoints.*;
import static dev.sanda.apifi.code_generator.entity.EntityCollectionEndpointType.*;
import static dev.sanda.apifi.service.graphql_subcriptions.EntityCollectionSubscriptionEndpoints.ON_ASSOCIATE_WITH;
import static dev.sanda.apifi.service.graphql_subcriptions.EntityCollectionSubscriptionEndpoints.ON_REMOVE_FROM;
import static dev.sanda.apifi.service.graphql_subcriptions.SubscriptionEndpoints.*;
import static javax.persistence.CascadeType.ALL;

import dev.sanda.apifi.annotations.EntityCollectionApi;
import dev.sanda.apifi.annotations.WithCRUDEndpoints;
import dev.sanda.apifi.annotations.WithMethodLevelSecurity;
import dev.sanda.apifi.annotations.WithSubscriptionEndpoints;
import dev.sanda.datafi.persistence.Archivable;
import java.util.Set;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

//import dev.sanda.apifi.annotations.EntityCollectionApi;
//import dev.sanda.apifi.annotations.WithCRUDEndpoints;

@Entity
@Getter
@Setter
@EqualsAndHashCode(exclude = "posts")
@WithCRUDEndpoints(
  {
    GET_PAGINATED_BATCH,
    GET_TOTAL_COUNT,
    GET_BY_ID,
    GET_BATCH_BY_IDS,
    CREATE,
    BATCH_CREATE,
    UPDATE,
    BATCH_UPDATE,
    DELETE,
    BATCH_DELETE,
    ARCHIVE,
    BATCH_ARCHIVE,
    DE_ARCHIVE,
    BATCH_DE_ARCHIVE,
    GET_ARCHIVED_PAGINATED_BATCH,
    GET_TOTAL_ARCHIVED_COUNT,
  }
)
@WithSubscriptionEndpoints(
  { ON_CREATE, ON_UPDATE, ON_DELETE, ON_ARCHIVE, ON_DE_ARCHIVE }
)
@WithMethodLevelSecurity(
  rolesAllowed = "ROLE_ADMIN",
  crudEndpointTargets = { CREATE, UPDATE },
  subscriptionEndpointTargets = {
    ON_CREATE, ON_UPDATE, ON_DELETE, ON_ARCHIVE, ON_DE_ARCHIVE,
  }
)
@WithMethodLevelSecurity(
  preAuthorize = "#{hasRole('ROLE_SYS_ADMIN')}",
  crudEndpointTargets = { CREATE, UPDATE },
  subscriptionEndpointTargets = { ON_DELETE, ON_ARCHIVE, ON_DE_ARCHIVE }
)
public class User implements Archivable {

  @Id
  @GeneratedValue
  private Long id;

  private Boolean isArchived = false;
  private String name;
  private String username;
  private String phoneNumber;

  @OneToMany(mappedBy = "user", cascade = ALL)
  @EntityCollectionApi(
    endpoints = {
      ASSOCIATE_WITH,
      REMOVE_FROM,
      GET_PAGINATED__BATCH,
      PAGINATED__FREE_TEXT_SEARCH,
    },
    freeTextSearchFields = "content",
    subscriptions = { ON_ASSOCIATE_WITH, ON_REMOVE_FROM }
  )
  private Set<Post> posts;
}
