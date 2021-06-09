package dev.sanda.users_and_posts;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class UsersAndPostsApplication /*extends SpringBootServletInitializer
  implements RequestStreamHandler */{

  public static void main(String[] args) {
    SpringApplication.run(UsersAndPostsApplication.class, args);
  }
  /*private static SpringBootLambdaContainerHandler<AwsProxyRequest, AwsProxyResponse> handler;

  static {
    try {
      handler =
        SpringBootLambdaContainerHandler.getAwsProxyHandler(
          UsersAndPostsApplication.class
        );
    } catch (ContainerInitializationException e) {
      // if we fail here. We re-throw the exception to force another cold start
      e.printStackTrace();
      throw new RuntimeException(
        "Could not initialize Spring Boot application",
        e
      );
    }
  }

  @Override
  public void handleRequest(
    InputStream inputStream,
    OutputStream outputStream,
    Context context
  ) throws IOException {
    handler.proxyStream(inputStream, outputStream, context);

    // just in case it wasn't closed by the mapper
    outputStream.close();
  }*/
}
