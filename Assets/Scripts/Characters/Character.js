#pragma strict

class Character extends MonoBehaviour {
  // ----------------
  // Public Variables
  // ----------------

  public var moveSpeed = 0;
  public var worthExperience = 10;
  public var bulletPrefab: GameObject;
  public var moveRate : float = Mathf.Infinity;
  public var maxHealth = 10;
  public var isImmuneToDamage = false;
  public var immuneAfterDamageDuration = 0.5;
  public var becomesImmuneAfterHit = false;

  // -------------------
  // Getters and Setters
  // -------------------

  public var _health = 1;
  function get health() : float {
    return _health;
  }
  function set health(value : float) {
    _health = value;
  }

  protected var _level = 1;
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

  protected var _kills = 0;
  function get kills() { return _kills; }
  function set kills(value: int) { _kills = value; }

  // -------------------
  // Protected Variables
  // -------------------

  protected var aiMovable: AIMovable;
  protected var showsPopupText: ShowsPopupText;
  protected var dropsSkills: DropsSkills;

  // ---------
  // Functions
  // ---------

  function Awake() {
    showsPopupText = gameObject.AddComponent(ShowsPopupText);
  }

  function Start() {
    // Movable
    aiMovable = gameObject.AddComponent(AIMovable);
    aiMovable.moveRate = moveRate;
    aiMovable.moveSpeed = moveSpeed;

    if (isEnemy()) {
      // DropsSkills
      dropsSkills = gameObject.AddComponent(DropsSkills);
      // All characters can drop health.
      dropsSkills.possibleSkillsDropped.Add(Health);
    }
  }

  function isEnemy() {
    return transform.tag == 'enemy';
  }

  function gainExperience(experience: int) {}

  function OnTriggerEnter2D(other: Collider2D) {
    if (health <= 0) { return; }

    var projectile = other.GetComponent(Projectile);
    // Support projectiles with a wrapper
    // TODO Refactor so we don't have to do this. Perhaps every projectile
    // should just have a wrapper.
    if (!projectile) {
      projectile = other.GetComponentInParent(Projectile);
    }
    if (projectile) {
      projectile.processHit(this);
    }

    var otherCharacter = other.GetComponent(Character);
    if (otherCharacter) {
      meleeHitByOther(otherCharacter);
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

  function meleeHitByOther(otherCharacter: Character) {
    // Enemies don't fight each other
    if (otherCharacter.transform.tag == 'enemy' &&
        transform.transform.tag == 'enemy') {
      return;
    }

    takeDamage(otherCharacter.damage, otherCharacter);
  }

  function takeDamage(damage: int, otherCharacter: Character) {
    if (damage <= 0) { return; }
    if (isImmuneToDamage) { return; }

    yield immunityAfterHit();

    showsPopupText.show(damage, transform.position);
    health -= damage;

    if (health <= 0) {
      // Died!
      otherCharacter.gainExperience(worthExperience);
      otherCharacter.kills++;
      die();
    } else {
      // Damaged
      animateHit();
    }
  }

  function immunityAfterHit() {
    if (!becomesImmuneAfterHit) { return; }

    isImmuneToDamage = true;
    yield WaitForSeconds(immuneAfterDamageDuration);
    isImmuneToDamage = false;
  }

  function heal(healAmount: int) {
    var finalHealAmount = healAmount;
    // Can't go past max health
    if ( (health + healAmount) > maxHealth ) {
      finalHealAmount = maxHealth - health;
    }
    // Don't show healing for zero.
    if (finalHealAmount == 0) { return; }
    health += finalHealAmount;
    showsPopupText.show(healAmount, transform.position, Color.green);
  }

  function attack(direction: Vector2) {
    var skillOptions = new SkillOptions();
    skillOptions.direction = direction;
    skillOptions.character = this;
    SendMessage('useSkill', skillOptions);
  }
}

