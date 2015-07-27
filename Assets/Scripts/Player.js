#pragma strict

public var damage = 1.0;
public var moveSpeed = 2.0;  // Units per second
public var totalExperience = 0;
public var level = 1;

function Start () {

}

function Update () {

}

function gainExperience(experience: int) {
  totalExperience += experience;
  if (totalExperience > 100) {
    damage += 1.0;
    level++;
    totalExperience = 0;
  }
}
