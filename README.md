# Frontend Project

# Overview

This project is the frontend required to run [this assesment test](https://github.com/noscai/fullstak-senior-engineer-scheine/tree/main).
It is supposed to be a minimal configuration to generate general medical certificate (Mustersammlung) in PDF, based on data entered by user. All the data on the form is randomly generated at launch, but you can change it (other than patient data).

# What Can We Do With This Application?

After you run the application, load the main page and it will show you the pre-filled form that you can change the value. You can select the patient and it will change the patient information on the `<PatientBox/>` component.
All the data is retrieved from the backend, including the doctor login data is retrieved; although the doctor id is hardcoded on the frontend. We usually get this by some authentication function.
You can change the document category (I interpret this from the german version of the document. Sorry if I mistaken the terms) and it will change which check box will we check in the generated PDF later.
After we fill in all the columns, we can click `Submit and Preview Document` and it will send the values to the backend, generate the PDF document, and it will open the document on the new tab. Pretty simple 👌

## Why Pre-Filled The Form?

To be honest, filling the form for demoing something can be a little tedious. I think this will help make that a little better.

# Code Structure

All the folders and files that we used can be explained as:

-   `api` to host our main implementation to contact the backend using `Axios`. nothing much.
-   `components` to host all of other components loaded in the application
-   `libs` to host our domains. We have three domains, `doctors`, `medical-records` (yeah, I forgot to use the same term as the backend 🤦🤦‍♀️🤦‍♂️), and `patients`. Each domains will have several folders inside them:
    -   `hooks` to host our implementation of `react query` to manage our API-related function (get, create, etc). We do separate the implementation for each operation for better development process 🤣
    -   `types` to host our data types and DTO.
-   `App.tsx` is our homepage implementation.
-   `main.tsx` will serve as main point of our application. We put our implementation of `react-router` in here too.

We do implement basic validation (only to make every column required and make sure the value is string) using `Yup` on the frontend, but we also implement the same validation on the backend using `class-validator`.
We use Formik to help our form management and Tailwind as our way to styling the component. All styling is thanks to [Flowbite](https://flowbite.com/docs/components/forms/) 🙈🙉🙊.

# Operation Environment

-   NodeJS v20.17.0 LTS
-   Windows 11
-   React ^18.3.1
-   Vite ^5.4.1

# Development Setup

## Build

To build the program, you need to:

-   clone the repository
-   `cd` into it
-   run `npm install` to install dependency
-   run `npm run build`

## Run Locally

**Note: Make sure you already setup the backend part and run the server before run this frontend part.**

To run the program locally, you need to:

-   clone the repository
-   `cd` into it
-   run `npm install` to install dependency
-   run `npm run dev` to run the program locally. It should serve you on `http://localhost:5173`
