#pragma strict

class AIMovable extends MonoBehaviour {
  // Public variables
  public var moveRate : float = 0;
  public var moveSpeed : float = 0;

  // Private variables
  private var nextMove : float = 0;
  private var player: Player;
  private var _rigidbody2D: Rigidbody2D;

  function Start() {
    _rigidbody2D = gameObject.GetComponent.<Rigidbody2D>();
  }

  function Update() {
    if (Time.time > nextMove) {
      nextMove = Time.time + moveRate;

      if (!player) {
        player = GameObject.FindWithTag('Player').GetComponent(Player);
      }

      var forceDirection =
        (player.transform.position - transform.position).normalized;

      stopMovement();
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
