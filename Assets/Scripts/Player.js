#pragma strict

class Player extends Character {
  var fireRate: float = 0.2;

  var _baseDamage = 0;
  function get baseDamage() { return (level * 1.5); }

  function get weaponDamage() {
    var skill = GetComponent(Skill);
    return skill ? skill.damage : 0;
  }

  var _totalExperience = 1;
  function get totalExperience() {
    return _totalExperience;
  }

  function set kills(value: int) {
    _kills = value;
    updateStatusManager();
  }

  function set totalExperience(value: int) {
    _totalExperience = value;
    updateStatusManager();
  }

  function get level() : int {
    return Mathf.CeilToInt(totalExperience / 100F);
  }
  function set level(value : int) {
    level = value;
  }

  function set health(value : float) {
    _health = value; updateStatusManager();
  }

  function get damage() : float {
    // Don't allow less than one damage
    var totalDamage = baseDamage + weaponDamage;
    return totalDamage > 0 ? totalDamage : 1;
  }

  function Start () {
    moveSpeed = 2.0;
    updateStatusManager();
  }

  function gainExperience(experience: int) {
    var startLevel = level;
    totalExperience += experience;
    Debug.Log('+' + experience + 'XP');
    if (startLevel != level) {
      Debug.Log('ZTARG!');
      Debug.Log('Level: ' + level);
      Debug.Log('Damage: ' + damage);
    }
  }

  function pickUp(newSkill: Skill) {
    var skill = GetComponent(Skill);
    if (!skill) {
      skill = gameObject.AddComponent(newSkill.GetType()) as Skill;
    }
    // TODO find a way to clone without all of this boilerplate.
    skill.color = newSkill.color;
    skill.damage = newSkill.damage;
    skill.symbol = newSkill.symbol;
    updateStatusManager();
  }

  function updateStatusManager() {
    var canvas = GameObject.FindWithTag('HUD');
    var statusManager = canvas.GetComponentInChildren(StatusManager);
    if (statusManager) {
      statusManager.level = level;

      statusManager.damage = damage;
      statusManager.baseDamage = baseDamage;
      statusManager.weaponDamage = weaponDamage;

      statusManager.kills = kills;
      statusManager.experience = totalExperience;
      statusManager.experienceNeededForNextLevel = level * 100;
      statusManager.health = health;
    } else {
      Debug.Log('No status manager');
    }
  }
}

