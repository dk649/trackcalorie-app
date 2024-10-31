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
    this._displayCaloriesProgress();
  }

  //Public Methods

  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this._displayNewMeal(meal);
    this._render();
  }

  addWorkout(exercise) {
    this._workouts.push(exercise);
    this._totalCalories -= exercise.calories;
    this._displayNewWorkout(exercise);
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
    const progressEl = document.getElementById("calorie-progress");

    const caloriesRemaining = this._calorieLimit - this._totalCalories;

    caloriesRemainingEL.innerHTML = caloriesRemaining;

    if (caloriesRemaining <= 0) {
      caloriesRemainingEL.parentElement.parentElement.classList.remove(
        "bg-light"
      );
      caloriesRemainingEL.parentElement.parentElement.classList.add(
        "bg-danger"
      );
      progressEl.classList.remove("bg-success");
      progressEl.classList.add("bg-danger");
    } else {
      caloriesRemainingEL.parentElement.parentElement.classList.remove(
        "bg-danger"
      );
      caloriesRemainingEL.parentElement.parentElement.classList.add("bg-light");
    }

    progressEl.classList.remove("bg-danger");
    progressEl.classList.add("bg-success");
  }

  _displayCaloriesProgress() {
    const progressEl = document.getElementById("calorie-progress");
    const percentage = (this._totalCalories / this._calorieLimit) * 100;
    const width = Math.min(percentage, 100);
    progressEl.style.width = `${width}%`;
  }

  _displayNewMeal(meal) {
    const mealsEl = document.getElementById("meal-items");
    const mealEl = document.createElement("div");
    mealEl.classList.add("card", "my-2");
    mealEl.setAttribute("data-id", meal.id);
    mealEl.innerHTML = `

     <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${meal.name}</h4>
                  <div
                    class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${meal.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
    
    `;

    mealsEl.appendChild(mealEl);
  }

  _displayNewWorkout(workout) {
    const workoutsEl = document.getElementById("workout-items");
    const workoutEl = document.createElement("div");
    workoutEl.classList.add("card", "my-2");
    workoutEl.setAttribute("data-id", workout.id);
    workoutEl.innerHTML = `

     <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${workout.name}</h4>
                  <div
                    class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${workout.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
    
    `;

    workoutsEl.appendChild(workoutEl);
  }
  // this rerenders the data on the page
  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesLimit();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
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

class App {
  constructor() {
    this._tracker = new CalorieTracker();

    document
      .getElementById("meal-form")
      .addEventListener("submit", this._newItem.bind(this, "meal"));

    document
      .getElementById("workout-form")
      .addEventListener("submit", this._newItem.bind(this, "workout"));
  }

  _newItem(type, event) {
    event.preventDefault();
    const name = document.getElementById(`${type}-name`);
    const calories = document.getElementById(`${type}-calories`);

    if (name.value === "" || calories.value === "") {
      alert("Please enter meal & calories");
      return;
    }

    if (type === "meal") {
      const meal = new Meal(name.value, +calories.value);
      this._tracker.addMeal(meal);
    } else {
      const workout = new Workout(name.value, +calories.value);
      this._tracker.addWorkout(workout);
    }

    name.value = "";
    calories.value = "";

    const collapseItem = document.getElementById(`collapse-${type}`);
    const bsCollapse = new bootstrap.Collapse(collapseItem, {
      toggle: true,
    });
  }
}

const app = new App();

// const tracker = new CalorieTracker();

// const breakfast = new Meal("porrage", 400);

// tracker.addMeal(breakfast);

// const pushups = new Workout("pushups", 100);

// tracker.addWorkout(pushups);

// console.log(tracker._meals, tracker._totalCalories);
