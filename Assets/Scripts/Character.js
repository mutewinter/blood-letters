#pragma strict

class Character extends MonoBehaviour {
  public var moveSpeed = 0;
  public var worthExperience = 10;
  public var bulletPrefab: GameObject;
  public var moveRate : float = Mathf.Infinity;

  public var _health = 1;
  function get health() : float {
    return _health;
  }
  function set health(value : float) {
    _health = value;
  }

  public var _damage = 1;
  function get damage() : float {
    return _damage;
  }
  function set damage(value : float) {
    _damage = value;
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
      bullet.processHit(this);
    }

    var otherCharacter = other.GetComponent.<Character>();
    if (otherCharacter) {
      processMeleeHit(otherCharacter);
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

  function processMeleeHit(otherCharacter: Character) {
    // Enemies don't fight each other
    if (otherCharacter.transform.tag == 'enemy' &&
        transform.transform.tag == 'enemy') {
      return;
    }

    takeDamage(otherCharacter);
  }

  function takeDamage(otherCharacter: Character) {
    health -= otherCharacter.damage;

    if (health <= 0) {
      otherCharacter.gainExperience(worthExperience);
      otherCharacter.kills++;
    }

    if (health <= 0) {
      // Died!
      die();
    } else {
      // Damaged
      animateHit();
    }
  }

  function attack(direction: Vector2) : Bullet {
    var bulletObject = Instantiate(
      bulletPrefab, transform.position, Quaternion.identity
    );
    var bullet = bulletObject.GetComponent.<Bullet>();
    bullet.shooter = this;
    bullet.fire(direction, damage);
    return bullet;
  }
}

