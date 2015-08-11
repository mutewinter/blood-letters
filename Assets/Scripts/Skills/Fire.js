#pragma strict

class Fire extends Skill {
  function Awake() {
    damageMin = 3;
    damageMax = 10;
    symbol = 'F';
    color = Color.red;
    super.Awake();
  }
}
