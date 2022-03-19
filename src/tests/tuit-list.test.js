import Tuits from "../components/tuits/index";
import { screen, render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { findAllTuits } from "../services/tuits-service";
import axios from "axios";

// jest.mock("axios");

const MOCKED_USERS = [
  {
    _id: "234",
    username: "delta",
    password: "test",
    email: "delta@alice.com",
  },
  {
    _id: "456",
    username: "gamma",
    password: "test",
    email: "gamma@bob.com",
  },
  {
    _id: "789",
    username: "xeta",
    password: "test",
    email: "charlie@chaplin.com",
  },
];

const MOCKED_TUITS = [
  { _id: "123", tuit: "alice's tuit", postedBy: MOCKED_USERS[0] },
  { _id: "345", tuit: "bob's tuit", postedBy: MOCKED_USERS[1] },
  { _id: "567", tuit: "charlie's tuit", postedBy: MOCKED_USERS[2] },
];

test("tuit list renders static tuit array", () => {
  render(
    <HashRouter>
      <Tuits tuits={MOCKED_TUITS} />
    </HashRouter>
  );
  const linkElement = screen.getByText(/alice's tuit/i);
  expect(linkElement).toBeInTheDocument();
});

test("tuit list renders async", async () => {
  // TODO: implement this
  const tuits = await findAllTuits();
  render(
    <HashRouter>
      <Tuits tuits={tuits} />
    </HashRouter>
  );
  const linkElement = screen.getByText(/qwerty/i);
  expect(linkElement).toBeInTheDocument();
});
