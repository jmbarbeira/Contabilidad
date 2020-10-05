---
description: small app to start working as autonomo ( spain independent working consultant)
---

# Contabilidad

## Installation

### BackEnd

Move to BackEnd

```
$ cd BackEnd
```

Now lets try to install all the packages needed for the backend

```bash
$ npm install
```

Now we would just need to set up an environment file

```bash
$ mkdir env
```

Now let's create the file that will contain the variables. We will have 2 variables: 

* URI\_MONGO - that would be provided by atlas or if the server is installed on demand could be localhost
* PORT - API port that would be used

```bash
$ echo PORT = 3008 URI_MONGO=http://<url>/<database> > .env
```

We would be ready to run our API

```bash
$ npm run start
```

### FrontEnd

Go to FrontEnd Folder

```bash
$ cd FrontEnd
```

Now lets try to install all the packages needed for the FrontEnd

```bash
$ npm install
```

Now we would have to change our environment variables on the environmet.ts file located in the environments folder

```bash
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
export const environment = {
  production: false,
  apiport:3008
};

```

Now we can just start to run angular

```bash
$ ng serve -o
```

