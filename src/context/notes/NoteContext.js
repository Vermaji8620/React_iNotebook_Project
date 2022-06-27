// isme hm react ko ye bol rhe hai ki hm contextApi ka use krna chah rhe hai...
// aur isiliye hm {createContext} ko import krrhe hai---
// aur phir hm context banake export kr de rhe hai NoteState me

import { createContext } from "react";

const noteContext = createContext();

export default noteContext;

// use of making context api

// while passing props, we need to struggle a lot , that is we need to pass the prop from one place to the another and then to the another and then to the another and then to the another. This passing of the props is a headache when there is a component inside a comnponent inside a component, inside a component , inside a component . Hence to reduce this useless effort we can make a context inside the main file and then export that file to that file where we want the prop to be there..
