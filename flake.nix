{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flakelight.url = "github:nix-community/flakelight";
  };
  outputs =
    { flakelight, ... }@inputs:
    flakelight ./. {
      inherit inputs;
      devShell.packages =
        pkgs: with pkgs; [
          bun
          python314Packages.livereload
        ];

      devShell.shellHook =
        pkgs: with pkgs; ''
          export LD_LIBRARY_PATH="${
            lib.makeLibraryPath [
              stdenv.cc.cc.lib
            ]
          }"
        '';

      devShells.ci.packages = pkgs: with pkgs; [
        bun
      ];
    }; 
}
