#pragma strict

class Fire extends Skill {
  function Start() {
    damageMin = 3;
    damageMax = 10;
    symbol = 'F';
    super.Start();
  }
}