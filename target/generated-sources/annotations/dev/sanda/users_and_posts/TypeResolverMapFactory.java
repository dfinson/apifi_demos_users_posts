package dev.sanda.users_and_posts;

import dev.sanda.datafi.reflection.runtime_services.CollectionsTypeResolver;
import dev.sanda.users_and_posts.model.Comment;
import dev.sanda.users_and_posts.model.Post;
import java.lang.Class;
import java.lang.String;
import java.util.HashMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TypeResolverMapFactory {

  @Bean
  public CollectionsTypeResolver collectionsTypesResolver() {
    HashMap<String, Class> typeResolverMap = new HashMap<String, Class>();
    typeResolverMap.put("Post.comments", Comment.class);
    typeResolverMap.put("User.posts", Post.class);
    typeResolverMap.put("Comment.replies", Comment.class);
    return new CollectionsTypeResolver(typeResolverMap);
  }
}
