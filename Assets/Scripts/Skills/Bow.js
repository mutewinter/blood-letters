#pragma strict

class Bow extends Skill {
  function Start() {
    damageMin = 1;
    damageMax = 3;
    symbol = 'D';
    // Same as kobold
    Color.TryParseHexString('FBE39F', color);
    super.Start();
  }
}
