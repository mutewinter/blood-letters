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

  public var _kills = 0;
  function get kills() { return _kills; }
  function set kills(value: int) { _kills = value; }

  function Start () {

  }

  function Update () {

  }

  function gainExperience(experience: int) {}

  function hit(other: Character) {
    other.health -= damage;
    Debug.Log('Hit ' + other + ' for ' + damage + '. ' + 'HP: ' + other.health);
    if (other.health <= 0) {
      this.gainExperience(other.worthExperience);
      kills++;
    }
  }

  function onDied() {
    var mainCamera = GameObject.FindWithTag('MainCamera');
    var gameManager = mainCamera.GetComponent.<GameManager>();
    gameManager.characterDied(this);
  }
}

