# CurrencyExchanger

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Documentation

# 1- Home Page : First page contains   

  - a sticky header with a Logo (left) and Nav links (right) as “EUR-USD Details” and “EUR-GBP Details”.

![image](https://github.com/mobasherahmed/CurrenyExchanger/assets/48737204/e82cb8dd-09df-46b0-a30c-eaff3afbb0b8)

# 2- Converter component :

   # converter sticky panel : 
   ( 
    * An amount input (numbers only).
    * Dropdowns showing all the available currencies in a FROM and TO lists
    * Button to swap the currencies in FROM and TO, Button to convert.
    * Button to redirect to details page for the selected FROM and TO.
    * Converted result displayed
  )
  - 3x3 cards grid with converted value of the entered amount to the 9 most popular currencies .

![image](https://github.com/mobasherahmed/CurrenyExchanger/assets/48737204/f95e45a8-8b35-4fae-8152-33a385c040fe)

![image](https://github.com/mobasherahmed/CurrenyExchanger/assets/48737204/2d9744c7-e955-4b86-8e68-6e745ec5302a)

# 3- Details page : 

## contains

* Full name of the “From” currency
* Button to go back to Home page
* Sticky converter panel with chosen currencies preselected, entered amount, details button hidden and ‘From’ dropdown disabled
* Change the “To” dropdown then click convert and it reflects on all details

![image](https://github.com/mobasherahmed/CurrenyExchanger/assets/48737204/7150400c-89f6-4ebd-9546-164f9af468a6)


# 4- Char Component

 ## contains

* Monthly historical rates for the selected currencies for past year.
* Months on horizontal axis and Rates on vertical axis.

![image](https://github.com/mobasherahmed/CurrenyExchanger/assets/48737204/2313cb97-545c-4707-96cf-5e96acdaed1d)



