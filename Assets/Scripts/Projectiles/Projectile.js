#pragma strict

class ProjectileOptions extends System.ValueType {
  public var character: Character;
  public var direction: Vector2;
  public var shouldDestroyOnHit: boolean;
  public var baseDamage: int;

  function get damage() {
    return baseDamage + character.damage;
  }

  function ProjectileOptions(skillOptions: SkillOptions) {
    character = skillOptions.character;
    direction = skillOptions.direction;

    // Defaults
    shouldDestroyOnHit = true;
  }

  function ProjectileOptions(skillOptions: SkillOptions, d: Vector2) {
    character = skillOptions.character;
    direction = d;

    // Defaults
    shouldDestroyOnHit = true;
  }
}

class Projectile extends MonoBehaviour {
  public var secondsToLive = 0.8;
  public var speed : float = 100;
  public var shootable: Shootable;
  public var callback: Function;
  public var callbackRate = 0.1;

  private var nextCallback : float = 0;
  private var previousPosition = Vector2.zero;

  function Awake() {
    shootable = gameObject.AddComponent(Shootable);
    shootable.projectile = gameObject;
  }

  function Start() {
    shootable.speed = speed;
    shootable.secondsToLive = secondsToLive;
  }

  function Update() {
    if (Time.time > nextCallback && callback) {
      if (previousPosition != Vector2.zero) {
        Debug.DrawLine(previousPosition, transform.position, Color.white, 1f);
      }
      nextCallback = Time.time + callbackRate;
      callback(this, previousPosition);
      previousPosition = transform.position;
    }
  }

  function fire(projectileOptions: ProjectileOptions) {
    shootable.fire(projectileOptions);
  }

  function processHit(victim: Character) {
    shootable.processHit(victim);
  }
}
