FROM maven:3.8.3-openjdk-17-slim AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn package -DskipTests

FROM maven:3.8.3-openjdk-17-slim
WORKDIR /app
COPY --from=builder /app/target/backend-0.0.1-SNAPSHOT.jar .

RUN apt-get update && apt-get install -y wget
RUN wget https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O wait-for-it.sh
RUN chmod +x wait-for-it.sh

CMD ["./wait-for-it.sh", "mysqldb:3306", "--", "java", "-jar", "backend-0.0.1-SNAPSHOT.jar"]