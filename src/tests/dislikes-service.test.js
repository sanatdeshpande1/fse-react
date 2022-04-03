import * as dislikeService from "../services/dislikes-service";
import * as tuitService from "../services/tuits-service";
import * as userService from "../services/users-service";

describe("user dislikes a tuit", () => {
  // sample user to insert
  const testUser = {
    _id: "22411032857323a32f36d852",
    username: "testuser",
    password: "test",
    email: "testuser@gmail.com",
  };
  // sample tuit to insert
  const testTuit = {
    _id: "32411032857323a32f36d852",
    tuit: "Test Tuit 123",
  };

  // setup test before running test
  beforeAll(async () => {
    await tuitService.deleteTuit(testTuit._id);
    return await userService.deleteUser(testUser._id);
  });

  // clean up after test runs
  afterAll(async () => {
    // remove any data we created
    await tuitService.deleteTuit(testTuit._id);
    return await userService.deleteUser(testUser._id);
  });

  test("can dislike a tuit with REST API", async () => {
    const newUser = await userService.createUser(testUser);
    const newTuit = await tuitService.createTuit(newUser._id, testTuit);
    const res = await dislikeService.userDislikesTuit(newUser._id, newTuit._id);
    const retTuit = await tuitService.findTuitById(newTuit._id);
    expect(res).toEqual("OK");
    expect(retTuit.stats.dislikes).toEqual(1);
  });
});

describe("user removes dislike from a tuit", () => {
  // sample user to insert
  const testUser = {
    _id: "22411032857323a32f36d859",
    username: "testuser",
    password: "test",
    email: "testuser@gmail.com",
  };
  // sample tuit to insert
  const testTuit = {
    _id: "32411032857323a32f36d859",
    tuit: "Test Tuit 123",
  };

  // setup test before running test
  beforeAll(async () => {
    await tuitService.deleteTuit(testTuit._id);
    return await userService.deleteUser(testUser._id);
  });

  // clean up after test runs
  afterAll(async () => {
    // remove any data we created
    await tuitService.deleteTuit(testTuit._id);
    return await userService.deleteUser(testUser._id);
  });

  test("can remove dislike from a tuit with REST API", async () => {
    const newUser = await userService.createUser(testUser);
    const newTuit = await tuitService.createTuit(newUser._id, testTuit);
    let res = await dislikeService.userDislikesTuit(newUser._id, newTuit._id);
    let retTuit = await tuitService.findTuitById(newTuit._id);
    expect(res).toEqual("OK");
    expect(retTuit.stats.dislikes).toEqual(1);

    res = await dislikeService.userDislikesTuit(newUser._id, newTuit._id);
    retTuit = await tuitService.findTuitById(newTuit._id);
    // expect(res).toEqual("OK");

    expect(retTuit.stats.dislikes).toEqual(0);
  });
});

describe("find all users that dislike a tuit", () => {
  // sample user to insert
  const testUser = {
    _id: "22411032857323a32f36d859",
    username: "testuser",
    password: "test",
    email: "testuser@gmail.com",
  };

  const testUser1 = {
    _id: "22411032857323a32f36d851",
    username: "testuser1",
    password: "test",
    email: "testuser1@gmail.com",
  };
  // sample tuit to insert
  const testTuit = {
    _id: "32411032857323a32f36d859",
    tuit: "Test Tuit 123",
  };

  // setup test before running test
  beforeAll(async () => {
    await userService.deleteUser(testUser1._id);
    await tuitService.deleteTuit(testTuit._id);
    return await userService.deleteUser(testUser._id);
  });

  // clean up after test runs
  afterAll(async () => {
    // remove any data we created
    await userService.deleteUser(testUser1._id);
    await tuitService.deleteTuit(testTuit._id);
    return await userService.deleteUser(testUser._id);
  });

  test("find all users that disliked a tuit with REST API", async () => {
    const newUser = await userService.createUser(testUser);
    const newUser1 = await userService.createUser(testUser1);
    const newTuit = await tuitService.createTuit(newUser._id, testTuit);
    let res = await dislikeService.userDislikesTuit(newUser._id, newTuit._id);
    let retTuit = await tuitService.findTuitById(newTuit._id);
    expect(res).toEqual("OK");
    expect(retTuit.stats.dislikes).toEqual(1);

    res = await dislikeService.userDislikesTuit(newUser1._id, newTuit._id);
    retTuit = await tuitService.findTuitById(newTuit._id);
    expect(res).toEqual("OK");
    expect(retTuit.stats.dislikes).toEqual(2);

    const users = await dislikeService.findAllUsersThatDislikedTuit(newTuit._id);
    expect(users.length).toBeGreaterThanOrEqual(2);
  });
});

describe("find all tuits disliked by a user", () => {
  // sample user to insert
  const testUser = {
    _id: "22411032857323a32f36d859",
    username: "testuser",
    password: "test",
    email: "testuser@gmail.com",
  };

  // sample tuits to insert
  const testTuit = {
    _id: "32411032857323a32f36d859",
    tuit: "Test Tuit 123",
  };

  const testTuit1 = {
    _id: "32411032857323a32f36d858",
    tuit: "Test Tuit 234",
  };

  // setup test before running test
  beforeAll(async () => {
    await tuitService.deleteTuit(testTuit1._id);
    await tuitService.deleteTuit(testTuit._id);
    return await userService.deleteUser(testUser._id);
  });

  // clean up after test runs
  afterAll(async () => {
    // remove any data we created
    await tuitService.deleteTuit(testTuit1._id);
    await tuitService.deleteTuit(testTuit._id);
    return await userService.deleteUser(testUser._id);
  });

  test("find all tuits disliked by a user with REST API", async () => {
    const newUser = await userService.createUser(testUser);
    const newTuit = await tuitService.createTuit(newUser._id, testTuit);
    const newTuit1 = await tuitService.createTuit(newUser._id, testTuit1);

    let res = await dislikeService.userDislikesTuit(newUser._id, newTuit._id);
    let retTuit = await tuitService.findTuitById(newTuit._id);
    expect(res).toEqual("OK");
    expect(retTuit.stats.dislikes).toEqual(1);

    let res1 = await dislikeService.userDislikesTuit(newUser._id, newTuit1._id);
    let retTuit1 = await tuitService.findTuitById(newTuit1._id);
    expect(res1).toEqual("OK");
    // expect(retTuit1.stats.dislikes).toEqual(1);

    const tuits = await dislikeService.findAllTuitsDislikedByUser(newUser._id);
    expect(tuits.length).toBeGreaterThanOrEqual(2);
  });
});
