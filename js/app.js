class CalorieTracker {
  constructor() {
    this._calorieLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
    this._displayCaloriesTotal();
    this._displayCaloriesLimit();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
  }

  //Public Methods

  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this._render();
  }

  addWorkout(exercise) {
    this._workouts.push(exercise);
    this._totalCalories -= exercise.calories;
    this._render();
  }

  // private methods

  _displayCaloriesTotal() {
    const totalCaloriesEl = document.getElementById("calories-total");
    totalCaloriesEl.innerHTML = this._totalCalories;
  }

  _displayCaloriesLimit() {
    const caloriesLinit = document.getElementById("calories-limit");
    caloriesLinit.innerHTML = this._calorieLimit;
  }

  _displayCaloriesConsumed() {
    const caloriesConsumedEl = document.getElementById("calories-consumed");

    const consumed = this._meals.reduce((acc, meal) => acc + meal.calories, 0);

    caloriesConsumedEl.innerHTML = consumed;
  }

  _displayCaloriesBurned() {
    const caloriesBurnedEl = document.getElementById("calories-burned");

    const calburned = this._workouts.reduce(
      (acc, workout) => acc + workout.calories,
      0
    );

    caloriesBurnedEl.innerHTML = calburned;
  }

  _displayCaloriesRemaining() {
    const caloriesRemainingEL = document.getElementById("calories-remaining");

    const caloriesRemaining = this._calorieLimit - this._totalCalories;

    caloriesRemainingEL.innerHTML = caloriesRemaining;
  }

  // this rerenders the data on the page
  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesLimit();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
  }
}

class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

const tracker = new CalorieTracker();

const breakfast = new Meal("porrage", 400);

tracker.addMeal(breakfast);

const pushups = new Workout("pushups", 100);

tracker.addWorkout(pushups);

console.log(tracker._meals, tracker._totalCalories);
