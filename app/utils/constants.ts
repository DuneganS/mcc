export const DEFAULT_ITEM = {
  id: "",
  name: "",
  craftable: false,
  image:
    "data:image/webp;base64,UklGRuYDAABXRUJQVlA4TNoDAAAvK8FKEGegKJIUh8IL/l1lLqfn2VAUAIRjRdK/gQBeGnB7/JRGksIQLD3Qf2WPygo3/wFAxJB9TAk/TAJgU/OfPtOg8vLts0hdApLbRpKkaEv//3RmRFQvM+eI/k9AtThseABgw3VGO2HYMb6xfIQjOiM5fMRVVFfx3OSoTdTXKsouhrTd+F080f8HSMoFkCrjgFupDV2pFyalJmFWB5syyaoMuzHkONveRs43aZ3toU8wIOB+APkAscypdzedMZ2vkarttnc8whxg8/bC3CA5h5E2iBIV/k+kHBARDty2cSRHXvTrdZLNA1B70W9xsmo5k0HKaKG5innMybPYmQxSRox/lUNn/ztWJKQz/4kqvyI0WJrEHPYJDWaz7H8NfkWUDf7nFn1SUsoPadFKUHketIo0mhncqcBHKfdzK6mBFjokfxkJjSPrF7kWidaGnz/L/hxKQ7JPjZAHwcYoV0mnMG4ZV7BxKm+lqZamW0mfBXJgLEjk2LkwdhE5m4+B4aksuigqpmEESeH4lvm9yEEr2b5mr92VaH9GHgRvPXYxDCqeIy86dlNT91SAV6DbySuw/H7QcjUwsLZo8lg4ZBwatGl9DvkdEf5WiSErgnISGn1FBaVgVokzQanjWT4olVXqz6Vopr+Iq34e+JBVjjwoQ63kkYoMcyG9IYISJCQOQCq2XIj7PWdDnmY5keycY8UlZFFM3SjbFWMaRqExyhSV6wIoId90gi57qKAQCk+CnaCTGTFOmblpnQ6sfGTFGwdBVY529Q38KiUB06m+gVIUdBgZelgFKikMX9tpU7zAyNCcDG1tThMCsq0cEf/P/4pZpEGmI9yTqrSpY6R5/fdeu4oCo0Hxpmc5sJpnxIRWHtN18FFda86PeHHG//xXQ3zjpJHveYzmO2aNFg2F2qQ0qCdU/QJSoJ7wek3Os3UofL6yxNXdGgou+eEM6gl4fXxmW4mlOXhmAwnz4HbuARItvTxsRqqQznk8QQMfbnkhPdk/CV7kORldtM+AB9eQojOsOgqAMeNTspS/o8v9NCTrTL5Z0ZN8cBLu9wSqKOSpMMSpODgJ41OyVEzGbRolIDM5kbxvl8KUhI8MCInTRnrk1VBuMwgyDNomvGf9LQLnY5cTuysSswecDGxlmhErF+o0uoILxZYbkfEhxFEBjUsh9TuBoz00nKo8beYsCq2+kmdgwRahhTDd/ZZ0nUpjC5liMQppIS5snDVWc0lGvziTsot0LI0Y4rFuNiIfUh1Q7tsUaTjUOfxPvzLINtmdjOBQaqJiTMrf6BTXPXmyvn7yPceHEzOi/hqmAQ==",
  recipeOutput: 0,
  recipeIngredients: [],
  recipeIngredientAmounts: [],
};
export const CRAFTING_ARROW =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACCCAYAAADBq8MQAAABhWlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bS1WqDnYQcQhSnSyIijiWKhbBQmkrtOpgcukXNGlIUlwcBdeCgx+LVQcXZ10dXAVB8APE2cFJ0UVK/F9SaBHjwXE/3t173L0DvI0KU4yuKKCopp6Kx4RsblUIvKIH/fBjFJMiM7REejED1/F1Dw9f7yI8y/3cn6NPzhsM8AjEUabpJvEG8eymqXHeJw6xkigTnxNP6HRB4keuSw6/cS7a7OWZIT2TmicOEQvFDpY6mJV0hXiGOCwrKuV7sw7LnLc4K5Uaa92TvzCYV1fSXKc5gjiWkEASAiTUUEYFJiK0qqQYSNF+zMU/bPuT5JLIVQYjxwKqUCDafvA/+N2tUZiecpKCMcD/YlkfY0BgF2jWLev72LKaJ4DvGbhS2/5qA5j7JL3e1sJHwMA2cHHd1qQ94HIHGHrSRF20JR9Nb6EAvJ/RN+WAwVugd83prbWP0wcgQ10t3wAHh8B4kbLXXd7d3dnbv2da/f0A0GZyzCAvNssAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfoCQ4FJDgELb3eAAAAGXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBHSU1QV4EOFwAAAW5JREFUeNrt3cGNQjEMRdEE0XKq+EVDC17EjgnnrGeFrhxpnhBzUOJ5nk/k79Za858+l5c0ECACBAEiQBAgAgQBIkDINH0ENaJLSNQti4kLiAARIAgQAYIAESAIEAFCKktIkd1LSFT3xcQFRIAIEASIAEGACBAEiAAhlSWkyKklJOrUYuIC4glGgCBABAgCRIAgQAQIqSwhRbovIVG7FxMXEE8wAgQBIkAQIAIEASJASDVv+Q89vUQXExcQTzACBAEiQBAgAgQBIkBIZQnBBUSAIEAECAJEgCBABAgC5F5vHwEZfCcETzAIEAGCABEgCBABggBpwe+EFPE7IS4gnmAQIAIEASJABAgCRIBwgO+EMMbYv3C4gHiCQYAIEASIAEGACBAESAuWkMudWjhcQDzBIEAECAJEgCBABAgCpAVLyI/qvnC4gAgQBIgAQYAIEASIAEGAtGAJaeaWhcMFRIAgQAQIAkSAIEAECAKkhS9L1iaH2BgGhQAAAABJRU5ErkJggg==";
