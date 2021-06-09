package dev.sanda.users_and_posts.model;

import java.util.Set;
import javax.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@EqualsAndHashCode(exclude = { "user", "post" })
public class Comment {

  @Id
  @GeneratedValue
  private Long id;

  @ManyToOne
  private Comment inReplyTo;

  @OneToMany
  private Set<Comment> replies;

  @ManyToOne
  private User user;

  @ManyToOne
  private Post post;

  @Column(length = 5000)
  private String content;
}
