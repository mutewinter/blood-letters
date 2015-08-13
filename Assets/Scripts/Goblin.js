#pragma strict

import System.Collections.Generic;

class Goblin extends Character {
  function Start () {
    worthExperience = 45;
    health = 5;
    moveSpeed = 10;
    moveRate = 0.8;
    super.Start();
    GetComponent.<DropsSkills>().possibleSkillsDropped.Add(FireWave);
    GetComponent.<DropsSkills>().possibleSkillsDropped.Add(LightningOrb);
  }
}
