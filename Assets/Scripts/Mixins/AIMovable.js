#pragma strict

class AIMovable extends MonoBehaviour {
  // Public variables
  public var moveRate : float = 0;
  public var moveSpeed : float = 0;

  // Private variables
  private var nextMove : float = 0;
  private var player: Player;
  private var _rigidbody2D: Rigidbody2D;
  private var playerFinder: PlayerFinder;

  function Start() {
    _rigidbody2D = gameObject.GetComponent.<Rigidbody2D>();
    playerFinder = gameObject.AddComponent(PlayerFinder);
  }

  function Update() {
    if (Time.time > nextMove) {
      nextMove = Time.time + moveRate;
      // We stop each time so that the velocity from AddForce doesn't become
      // cumulative.
      stopMovement();

      var forceDirection = playerFinder.forceDirectionToPlayer();
      // Force direction is zero when the player can't be found or the player
      // is at the start position. Don't do anothing in this case.
      if (forceDirection == Vector2.zero) { return; }
      _rigidbody2D.AddForce(forceDirection * moveSpeed);
    }
  }

  function OnDisable() {
    stopMovement();
  }

  function stopMovement() {
    if (_rigidbody2D) {
      _rigidbody2D.velocity = Vector2.zero;
      _rigidbody2D.angularVelocity = 0;
    }
  }
}
