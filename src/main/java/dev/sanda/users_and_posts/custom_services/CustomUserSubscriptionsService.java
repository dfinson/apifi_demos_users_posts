package dev.sanda.users_and_posts.custom_services;

import dev.sanda.apifi.annotations.GraphQLComponent;
import dev.sanda.apifi.service.graphql_subcriptions.GraphQLSubscriptionsService;
import dev.sanda.users_and_posts.model.User;
import io.leangen.graphql.annotations.GraphQLSubscription;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service // <-- must
@GraphQLComponent // <-- must
public class CustomUserSubscriptionsService {

  @Autowired
  private GraphQLSubscriptionsService<User> userGraphQLSubscriptionsService;

  @GraphQLSubscription
  public Flux<User> onUserPhoneNumberUpdated(User toObserve) {
    final String topic =
      "User with id#" + toObserve.getId() + " updated phoneNumber";
    return userGraphQLSubscriptionsService.generatePublisher(topic);
  }
}
