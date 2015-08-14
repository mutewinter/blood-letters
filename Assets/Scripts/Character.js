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

  public var _level = 1;
  function get level() : int { return _level; }
  function set level(value : int) { level = value; }

  function get damage() {
    var computedDamage = Mathf.Log(level, 2);
    return computedDamage >= 1 ? computedDamage : 1;
  }

  function get skillDamage() {
    var skill = GetComponent(Skill);
    return skill ? skill.damage : 0;
  }

  public var _kills = 0;
  function get kills() { return _kills; }
  function set kills(value: int) { _kills = value; }

  function Start() {
    // Movable
    var aiMovable = gameObject.AddComponent(AIMovable);
    aiMovable.moveRate = moveRate;
    aiMovable.moveSpeed = moveSpeed;
    aiMovable.target = this;

    // DropsSkills
    var DropsSkills = gameObject.AddComponent(DropsSkills);
    aiMovable.target = this;
  }

  function gainExperience(experience: int) {}

  function OnTriggerEnter2D(other: Collider2D) {
    if (health <= 0) { return; }

    var projectile = other.GetComponent.<Projectile>();
    if (projectile) {
      projectile.processHit(this);
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
    gameObject.SendMessage('onDied', this);
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

    takeDamage(damage + skillDamage, otherCharacter);
  }

  function takeDamage(damage: int, otherCharacter: Character) {
    health -= damage;

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

  function attack(direction: Vector2) {
    var skillOptions = new SkillOptions();
    skillOptions.direction = direction;
    skillOptions.character = this;
    SendMessage('useSkill', skillOptions);
  }
}

