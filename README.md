# The Coolest Elevator 🚪

![](https://media.giphy.com/media/ZTgggVjz1wmQ72ErwT/giphy.gif)

This a implementation of a elevator made with Angular.

That project it's also result of an idea getted from [App Ideias Collection](https://github.com/florinpop17/app-ideas) repository.

## Demo 🔎

You can access the demo and test yourself [here](https://caribeedu.github.io/the-coolest-elevator/).

## Detailing 📋

### **Description**
#### Tier 3 - Advanced

*"The objective of the Elevator app is to simulate the operation of an elevator and more importantly, how to handle the events generated when the buildings occupants use it. This app simulates occupants calling for an elevator from any floor and pressing the buttons inside the elevator to indicate the floor they wish to go to."*

The original idea can be accessed [here](https://github.com/florinpop17/app-ideas/blob/master/Projects/3-Advanced/Elevator-App.md).

### **Requirements**

- A single event handler should be implemented for the up and down buttons on each floor. For example, if there are 4 floors a single event handler should be implemented rather than 8 (two buttons per floor).
- Similarly, a single event handler should be implemented for all buttons on the control panel in the elevator rather than a unique event handler for each button.

### **User Stories**

- [X] User can see a cross section diagram of a building, with control buttons for each floor.

- [X] User can see the elevator control panel with a button for each of the floors to the side of the diagram.

- [X] User can expect that clicking the up and down buttons on any floor to request the elevator will be queued and serviced in the sequence they were clicked.

- [X] User can click the elevator control panel to select the floor it should travel to.

- [X] User can expect the elevator to pause for 5 seconds waiting for a floor button on the control panel to be clicked. If a floor button isn't clicked within that time the elevator will process the next call request. If don't has any call requests, elevator should back to first floor.

### **Bonus Features**

- [X] User can see a warning sound if the number of elevator requests exceeds the maximum number allowed. This limit is **10 pending requests**.

- [X] User can hear a sound when the elevator arrives at a floor.

- [X] User can see an occupant randomly arrive at a floor to indicate when the user should click the up or down buttons.

- [X] User can specify the time interval between new occupants arriving to call an elevator.

## Running Locally 🛠️

1. Be sure you have Node.js installed (version used here is `v12.14.1`)
2. Run this command in project folder 
```
npm install
```
3. After installed the dependencies run
```
ng serve
```
4. The application will initialize at `http://localhost:4200`

## License 💼

MIT