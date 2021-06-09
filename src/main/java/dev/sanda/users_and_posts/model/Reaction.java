package dev.sanda.users_and_posts.model;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Random;

public enum Reaction {
  LIKE_,
  LOVE_,
  SAD_,
  ANGRY_,
  LAUGHING_;

  private static final List<Reaction> VALUES = Collections.unmodifiableList(
    Arrays.asList(values())
  );
  private static final int SIZE = VALUES.size();
  private static final Random RANDOM = new Random();

  public static Reaction randomReaction() {
    return VALUES.get(RANDOM.nextInt(SIZE));
  }
}
