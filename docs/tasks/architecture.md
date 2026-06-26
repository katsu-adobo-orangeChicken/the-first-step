# JavaScript Architecture Basics

## 1. Event

An **event** is a signal that something happened in the browser or app.

Examples:

* A button is clicked
* A key is pressed
* A form is submitted
* A page is loaded

```js
button.addEventListener("click", () => {
  console.log("Button clicked!");
});
```

In simple terms:

```txt
Something happens
↓
An event is fired
↓
JavaScript reacts to it
```

---

## 2. Pub/Sub Pattern

**Pub/Sub** stands for **Publisher-Subscriber Pattern**.

It is a pattern where one part of the app sends an event, and other parts of the app listen for it.

```txt
Publisher
↓
EventBus
↓
Subscriber
```

Example:

```js
eventBus.subscribe("userLoggedIn", (user) => {
  console.log(`Welcome back, ${user.name}`);
});

eventBus.publish("userLoggedIn", { name: "John" });
```

In simple terms:

**Pub/Sub lets different parts of the app communicate without directly depending on each other.**

---

## 3. EventBus

An **EventBus** is the middle layer that connects publishers and subscribers.

It usually has methods like:

```txt
subscribe()
publish()
unsubscribe()
```

Example:

```txt
User logs in
↓
EventBus publishes "userLoggedIn"
↓
Other modules react to that event
```

In simple terms:

**EventBus is like a notification system inside the app.**

---

## 4. Dependency Injection

**DI** stands for **Dependency Injection**.

It means:

**Instead of creating dependencies inside a class, you pass them from the outside.**

Bad example:

```js
class Order {
  constructor() {
    this.api = new Api();
  }
}
```

Better example:

```js
class Order {
  constructor(api) {
    this.api = api;
  }
}
```

Why this is better:

* Easier to test
* Easier to replace dependencies
* Less tightly coupled code
* More flexible architecture

In simple terms:

**DI means a class receives the tools it needs instead of creating them by itself.**

---

## 5. DI Container

A **DI Container** is a place where dependencies are registered and managed.

Instead of manually creating everything:

```js
const api = new Api();
const orderService = new OrderService(api);
```

You can use a container:

```js
const orderService = container.get("OrderService");
```

In simple terms:

**A DI Container is a toolbox that gives each part of the app what it needs.**

---

## 6. Adapter Pattern

An **Adapter Pattern** is used to make different systems work through the same interface.

Example:

```txt
Different API styles
↓
Adapter
↓
Same method for the app
```

For example, HTTP and WebSocket may work differently, but an adapter can make both usable like this:

```js
api.request("/users");
```

In simple terms:

**Adapter Pattern converts different shapes into one common shape.**

---

## 7. Interface Strategy

An **Interface Strategy** means defining a common rule for how something should be used.

Example:

```js
api.request(url, options);
```

Even if the actual implementation changes, the app still uses the same method.

```txt
App code
↓
Common interface
↓
HTTP API / WebSocket API / Mock API
```

In simple terms:

**Interface Strategy means deciding a shared contract so different implementations can be swapped easily.**

---

## 8. How They Work Together

```txt
UI Layer
React / Vanilla JS / Vue

↓ Adapter

Core Logic

↓ DI Container

Services
API / Storage / Auth

↓ EventBus

Other Modules
Notifications / Logs / State Updates
```

The goal is to make the app:

* Easier to change
* Easier to test
* Less dependent on one framework
* Easier to extend
* Less likely to break when one part changes

---

## 9. Quick Summary

```txt
Event
= Something happened

Pub/Sub
= A communication pattern using events

EventBus
= The middle system that sends events to subscribers

Dependency Injection
= Passing dependencies from outside

DI Container
= A toolbox that manages dependencies

Adapter Pattern
= A converter that makes different systems look the same

Interface Strategy
= A shared rule for how modules should communicate
```

---

## Final Summary

These concepts help us build applications where modules are not tightly connected.

Instead of each part directly depending on another part, we use:

```txt
Events
Interfaces
Adapters
Dependency Injection
EventBus
DI Container
```

This makes the application more flexible, testable, and easier to maintain.
