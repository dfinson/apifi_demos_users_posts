package dev.sanda.users_and_posts.api_hooks;

import dev.sanda.apifi.service.api_hooks.ApiHooks;
import dev.sanda.apifi.service.graphql_subcriptions.GraphQLSubscriptionsService;
import dev.sanda.datafi.service.DataManager;
import dev.sanda.users_and_posts.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserApiHooks implements ApiHooks<User> {

  @Autowired
  private GraphQLSubscriptionsService<User> userGraphQLSubscriptionsService;

  @Override
  public void postUpdate(
    User originalInput, // the deserialized user json object "as is" from the API call
    User toUpdate, // a copy of the corresponding user object from the DB, prior to being updated
    User updated, // the final updated user object which has been saved to the DB
    DataManager<User> dataManager
  ) {
    if (originalInput.getPhoneNumber() != null) { // if the input to update included a new phone number
      final String topic =
        "User with id#" + updated.getId() + " updated phoneNumber";
      userGraphQLSubscriptionsService.publishToTopic(topic, updated);
    }
  }
}
