#pragma strict

class Character extends MonoBehaviour {
  public var moveSpeed = 0;
  public var health = 1;
  public var worthExperience = 10;
  public var bulletPrefab: GameObject;
  public var moveRate : float = Mathf.Infinity;

  public var _damage = 1;
  function get damage() : float {
    return _damage;
  }
  function set damage(value : float) {
    damage = value;
  }

  public var _kills = 0;
  function get kills() { return _kills; }
  function set kills(value: int) { _kills = value; }

  function Start () {
    // Movable
    var aiMovable = gameObject.AddComponent(AIMovable);
    aiMovable.moveRate = moveRate;
    aiMovable.moveSpeed = moveSpeed;
    aiMovable.target = this;
  }

  function Update () {

  }

  function gainExperience(experience: int) {}

  function OnTriggerEnter2D(other: Collider2D) {
    if (health <= 0) { return; }

    var bullet = other.GetComponent.<Bullet>();

    if (bullet) {
      // Can't hit the firee.
      if (this == bullet.character) { return; }

      // Enemy bullets can't hit enemies
      if (transform.tag == 'enemy' &&
        bullet.character.transform.tag == 'enemy') {
        return;
      }

      bullet.SendMessage('hit', this);

      if (health <= 0) {
        // Died!
        this.die();
      } else {
        // Damaged
        animateHit();
      }
    }
  }

  function die() {
    animateDeath();
  }

  function animateHit() {
    var animator = GetComponent.<Animator>();
    if (animator) {
      animator.SetTrigger('isHit');
    }
  }

  function animateDeath() {
    var animator = GetComponent.<Animator>();
    if (animator) {
      animator.SetBool('isDying', true);
    } else {
      cleanUpAfterDeath();
    }
  }

  function cleanUpAfterDeath() {
    onDied();
    var mainCamera = GameObject.FindWithTag('MainCamera');
    var gameManager = mainCamera.GetComponent.<GameManager>();
    gameManager.characterDied(this);
    Destroy(gameObject);
  }

  function deathAnimationComplete() {
    cleanUpAfterDeath();
  }

  // For subclasses to override.
  function onDied() { }
}

