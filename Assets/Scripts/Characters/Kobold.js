﻿#pragma strict

class Kobold extends Character {
  public var accuracy = 0.5;

  private var nextFire : float = 0;
  private var bulletSpeed : float = 100;
  private var fireRate : float = 1.6;
  private var playerFinder: PlayerFinder;

  function Start() {
    playerFinder = gameObject.AddComponent(PlayerFinder);
    worthExperience = 55;
    health = 15;
    moveSpeed = 10;
    moveRate = 0.8;
    var skill = gameObject.AddComponent(Bow);
    skill.damage = 1;
    super.Start();
    dropsSkills.possibleSkillsDropped.Add(Bow);
  }

  function Update () {
    if (Time.time > nextFire) {
      nextFire = Time.time + fireRate;
      var forceDirection = playerFinder.forceDirectionToPlayer();
      // Force direction is zero when the player can't be found or the player
      // is at the start position. Don't do anothing in this case.
      if (forceDirection == Vector2.zero) { return; }
      var fudge = 2f - (accuracy * 2f);
      forceDirection.x += Random.Range(-fudge, fudge);
      forceDirection.y += Random.Range(-fudge, fudge);
      attack(forceDirection.normalized);
    }
  }
}
