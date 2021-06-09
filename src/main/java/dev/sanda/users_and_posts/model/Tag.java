package dev.sanda.users_and_posts.model;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Random;

public enum Tag {
  INSPIRATIONAL_,
  POLITICAL_,
  TECHNOLOGY_,
  NEWS_;

  private static final List<Tag> VALUES = Collections.unmodifiableList(
    Arrays.asList(values())
  );
  private static final int SIZE = VALUES.size();
  private static final Random RANDOM = new Random();

  public static Tag randomTag() {
    return VALUES.get(RANDOM.nextInt(SIZE));
  }
}
