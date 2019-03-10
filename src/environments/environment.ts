// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  wrongPropValue: [
    null,
    undefined,
    '',
    false,
    true,
    "string",
    12312313123
  ],
  methods: [
    {
      id: 0,
      fullName: 'GET',
      shortName: 'get'
    },
    {
      id: 1,
      fullName: 'POST',
      shortName: 'post'
    },
    {
      id: 2,
      fullName: 'PUT',
      shortName: 'put'
    },
    {
      id: 3,
      fullName: 'DELETE',
      shortName: 'delete'
    },
  ],
  HTTP_BODY_STATE: {
    ORIGIN: 'ORIGIN',
    GENERETED: 'GENERETED'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
