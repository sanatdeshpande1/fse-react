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

describe("user dislikes a tuit", () => {
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
