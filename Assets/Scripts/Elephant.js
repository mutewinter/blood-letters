#pragma strict

class Elephant extends Character {
  public var angryDistance = 1.0;

  private var player: GameObject;

  // Private variables
  private var nextPlayerCheck : float = 0;
  private var playerCheckFrequency : float = 0.5;
  private var startingHealth : int;

  function Start () {
    worthExperience = 200;
    health = 30;
    startingHealth = health;
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
    } else if (health >= startingHealth) {
      // Can only become docile again if less than full health.
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

  function takeDamage(otherCharacter: Character) {
    enableAIMovement();
    super.takeDamage(otherCharacter);
  }
}
