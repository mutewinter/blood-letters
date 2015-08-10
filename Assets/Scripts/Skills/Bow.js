#pragma strict

class Bow extends Skill {
  function Start() {
    damageMin = 1;
    damageMax = 3;
    symbol = 'D';
    super.Start();
  }
}
