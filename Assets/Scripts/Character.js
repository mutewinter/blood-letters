#pragma strict

class Character extends MonoBehaviour {
  public var moveSpeed = 1.0;
  public var health = 1;
  public var worthExperience = 10;

  public var _damage = 1;
  function get damage() : float {
    return _damage;
  }
  function set damage(value : float) {
    damage = value;
  }

  function Start () {

  }

  function Update () {

  }

  function gainExperience(experience: int) {}

  function hit(other: Character) {
    Debug.Log('Hitting ' + other + ' for ' + damage);
    other.health -= damage;
    if (other.health <= 0) {
      this.gainExperience(other.worthExperience);
    }
  }
}

