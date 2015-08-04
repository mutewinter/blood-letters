#pragma strict

class AIMovable extends MonoBehaviour {
  // Public variables
  public var moveRate : float = 0;
  public var moveSpeed : float = 0;
  public var target : Character;

  // Private variables
  private var nextMove : float = 0;

  function Update () {
    if (Time.time > nextMove) {
      nextMove = Time.time + moveRate;
      var moveDirection = new Vector2(
        Random.Range(-1F, 1F),
        Random.Range(-1F, 1F)
      );
      var rigidbody2D = target.GetComponent.<Rigidbody2D>();
      rigidbody2D.AddForce(moveDirection * moveSpeed);
    }
  }
}
