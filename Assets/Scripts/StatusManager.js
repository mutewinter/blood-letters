#pragma strict

class StatusManager extends MonoBehaviour {
  public var text: UnityEngine.UI.Text;

  var _level = 0;
  function get level() { return _level; }
  function set level(value: int) { _level = value; updateStatus(); }

  var _damage = 0;
  function get damage() { return _damage; }
  function set damage(value: int) { _damage = value; updateStatus(); }

  var _kills = 0;
  function get kills() { return _kills; }
  function set kills(value: int) { _kills = value; updateStatus(); }

  var _experience = 0;
  function get experience() { return _experience; }
  function set experience(value: int) { _experience = value; updateStatus(); }

  var _experienceNeededForNextLevel = 0;
  function get experienceNeededForNextLevel() {
    return _experienceNeededForNextLevel;
  }
  function set experienceNeededForNextLevel(value: int) {
    _experienceNeededForNextLevel = value; updateStatus();
  }

  function Start () {
    updateStatus();
  }

  function Update () {
  }

  function updateStatus() {
    var levelText = String.Format(
      'Level: {0} ({1}/{2} XP)', level, experience,
      experienceNeededForNextLevel
    );
    text.text = String.Format(
      '{0}\nDamage: {1}\nKills: {2}', levelText, damage, kills
    );
  }
}
