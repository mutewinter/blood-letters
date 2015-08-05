#pragma strict

class Elephant extends Character {
  function Start () {
    worthExperience = 200;
    health = 30;
    moveSpeed = 50;
    moveRate = 0.8;

    super.Start();

    // Elephant doesn't move until the player gets too close
    disableAIMovement();
  }

  function Update () {
  }

  function disableAIMovement() {
    var aiMovable = GetComponent.<AIMovable>();
    aiMovable.enabled = false;
  }

  function enableAIMovement() {
    var aiMovable = GetComponent.<AIMovable>();
    aiMovable.enabled = true;
  }

  function OnTriggerEnter2D(other: Collider2D) {
    var player = other.GetComponentInParent.<Player>();
    if (player) { enableAIMovement(); }
  }

  function OnTriggerExit2D(other: Collider2D) {
    var player = other.GetComponentInParent.<Player>();
    if (player) { disableAIMovement(); }
  }
}
