import * as service from "../services/tuits-service";
import { createUser, deleteUsersByUsername } from "../services/users-service";

describe("createUser", () => {
  const testTuit = {
    _id: "54348288981a1966252bd1c6",
    tuit: "Hello there",
  };

  const testUser = {
    username: "testuser",
    password: "test",
    email: "test@user.com",
  };

  beforeAll(async () => {
    await deleteUsersByUsername(testUser.username);
    return await service.deleteTuit(testTuit._id);
  });

  afterAll(async () => {
    await deleteUsersByUsername(testUser.username);
    return await service.deleteTuit(testTuit._id);
  });

  test("can create tuit with REST API", async () => {
    const newUser = await createUser(testUser);

    const newTuit = await service.createTuit(newUser._id, testTuit);

    expect(newTuit.postedBy).toEqual(newUser._id);
    expect(newTuit.tuit).toEqual(testTuit.tuit);
    expect(newTuit._id).toEqual(testTuit._id);
  });
});

describe("deleteTuit", () => {
  const testTuit = {
    _id: "54348288981a1966252bd1c6",
    tuit: "Hello there",
  };

  const testUser = {
    username: "testuser",
    password: "test",
    email: "test@user.com",
  };

  beforeAll(async () => {
    const newUser = await createUser(testUser);
    return await service.createTuit(newUser._id, testTuit);
  });

  afterAll(async () => {
    await deleteUsersByUsername(testUser.username);
    return await service.deleteTuit(testTuit._id);
  });

  test("can delete tuit with REST API", async () => {
    const status = await service.deleteTuit(testTuit._id);
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  });
});

describe("findTuitById", () => {
  // TODO: implement this
  const testTuit = {
    _id: "54348288981a1966252bd1c6",
    tuit: "Hello there",
  };

  const testUser = {
    username: "testuser",
    password: "test",
    email: "test@user.com",
  };

  beforeAll(async () => {
    const newUser = await createUser(testUser);
    return await service.createTuit(newUser._id, testTuit);
  });

  afterAll(async () => {
    await deleteUsersByUsername(testUser.username);
    return await service.deleteTuit(testTuit._id);
  });

  test("can retrieve a tuit by their primary key with REST API", async () => {
    const fetchedTuit = await service.findTuitById(testTuit._id);
    expect(fetchedTuit._id).toEqual(testTuit._id);
    expect(fetchedTuit.tuit).toEqual(testTuit.tuit);
  });
});

describe("findAllTuits", () => {
  // TODO: implement this
  const tuits = [
    { uid: "54348288981a1966252bd1c6", tid: "14348288981a1966252bd1c6" },
    { uid: "54348288981a1966252bd1c2", tid: "24348288981a1966252bd1c6" },
    { uid: "54348288981a1966252bd1c3", tid: "34348288981a1966252bd1c6" },
  ];

  beforeAll(() => {
    tuits.map(async (tuit) => {
      const newTuit = {
        _id: tuit.tid,
        tuit: "Hello World",
      };
      await service.createTuit(tuit.uid, newTuit);
    });
  });

  afterAll(async () => {
    await Promise.all(
      tuits.map(async (tuit) => {
        await service.deleteTuit(tuit.tid);
      })
    );
  });

  test("can retrieve all tuits with REST API", async () => {
    const retTuits = await service.findAllTuits();
    expect(retTuits.length).toBeGreaterThanOrEqual(tuits.length);

    const insertedTuits = retTuits.filter((tuit) => {
      tuit.tuit === "Hello World";
    });

    insertedTuits.forEach((tuit) => {
      const newTuit = tuits.find((t) => t.tid === tuit._id);
      expect(newTuit._id).toEqual(tuit._id);
      expect(newTuit.tuit).toEqual(tuit.tuit);
      expect(newTuit.postedBy).toEqual(tuit.postedBy);
    });
  });
});
