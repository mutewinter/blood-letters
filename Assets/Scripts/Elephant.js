#pragma strict

class Elephant extends Character {
  public var angryDistance = 1.0;

  private var player: GameObject;

  // Private variables
  private var nextPlayerCheck : float = 0;
  private var playerCheckFrequency : float = 0.5;

  function Start () {
    worthExperience = 200;
    health = 30;
    moveSpeed = 10;
    moveRate = 0.8;

    // Track player so we can determine distance
    player = GameObject.FindGameObjectWithTag('Player');

    super.Start();

    // Elephant doesn't move until the player gets too close
    disableAIMovement();
  }

  function Update() {
    if (Time.time > nextPlayerCheck) {
      nextPlayerCheck = Time.time + playerCheckFrequency;
      watchPlayer();
    }
  }

  function watchPlayer() {
    if (!player) {
      // Track player so we can determine distance
      player = GameObject.FindGameObjectWithTag('Player');
    }

    var distanceFromPlayer =
      Vector2.Distance(transform.position, player.transform.position);
    if (distanceFromPlayer <= angryDistance) {
      enableAIMovement();
    } else {
      disableAIMovement();
    }
  }

  function disableAIMovement() {
    var aiMovable = GetComponent.<AIMovable>();
    aiMovable.enabled = false;
  }

  function enableAIMovement() {
    var aiMovable = GetComponent.<AIMovable>();
    aiMovable.enabled = true;
  }
}
