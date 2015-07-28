#pragma strict

class Player extends Character {
  public var totalExperience = 0;

  function get level() : int {
    return Mathf.Floor(totalExperience / 100) || 1;
  }
  function set level(value : int) {
    level = value;
  }

  function get damage() : float {
    return level * 1.5;
  }
  function set damage(value : float) {
    damage = value;
  }

  function Start () {
    moveSpeed = 2.0;
  }

  function Update () {

  }

  function gainExperience(experience: int) {
    totalExperience += experience;
    Debug.Log('Gained ' + experience + ' now level ' + level);
  }
}

