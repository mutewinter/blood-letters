#pragma strict

class Health extends Skill {
  var healing = 2;

  function Awake() {
    symbol = 'h';
    dropColor = Color.red;
    super.Awake();
    damage = 0;
  }
}
