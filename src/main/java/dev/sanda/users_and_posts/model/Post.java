package dev.sanda.users_and_posts.model;

import static dev.sanda.apifi.code_generator.entity.ElementCollectionEndpointType.*;
import static dev.sanda.apifi.code_generator.entity.MapElementCollectionEndpointType.*;
import static javax.persistence.EnumType.STRING;

import dev.sanda.apifi.annotations.ElementCollectionApi;
import dev.sanda.apifi.annotations.MapElementCollectionApi;
import dev.sanda.datafi.annotations.attributes.AutoSynchronized;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@EqualsAndHashCode(exclude = { "user", "comments" })
public class Post {

  @Id
  @GeneratedValue
  private Long id;

  @ManyToOne
  @AutoSynchronized
  private User user;

  @OneToMany(mappedBy = "post")
  private Set<Comment> comments;

  @ElementCollection
  @Enumerated(STRING)
  @ElementCollectionApi(
    endpoints = {
      ADD_TO, REMOVE__FROM, PAGINATED__BATCH_, PAGINATED__FREE__TEXT_SEARCH,
    }
  )
  private List<Reaction> reactions;

  @ElementCollection
  @CollectionTable(name = "tags")
  @MapKeyColumn(name = "tag")
  @Column(name = "count")
  @MapElementCollectionApi(
    endpoints = {
      PUT_ALL, REMOVE_ALL, PAGINATED__BATCH__, PAGINATED__FREE__TEXT__SEARCH,
    }
  )
  private Map<Tag, Integer> tagCount;

  @Column(length = 5000)
  private String content;
}
